import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface Local {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  endereco?: string;
  aberto?: boolean;
}

interface TempoViagem {
  modo: string;
  duracao: string;
  distancia: string;
}

const BELEM_CENTER: LatLngLiteral = {
  lat: -1.4557,
  lng: -48.4902,
};

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [
  "places",
  "geometry",
];

const modosTransporte = [
  { modo: "DRIVING", icone: "🚗", label: "Carro" },
  { modo: "TRANSIT", icone: "🚌", label: "Ônibus" },
  { modo: "WALKING", icone: "🚶", label: "A pé" },
  { modo: "BICYCLING", icone: "🚲", label: "Bicicleta" },
];

const MapaLocais = () => {
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<Local[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [searchRadius, setSearchRadius] = useState(1500);
  const [menuAberto, setMenuAberto] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [voiceGuidanceActive, setVoiceGuidanceActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"pt-BR" | "en">(
    "pt-BR"
  );
  const [temposViagem, setTemposViagem] = useState<TempoViagem[]>([]);
  const [modoTransporteSelecionado, setModoTransporteSelecionado] =
    useState("DRIVING");

  const calcularTemposViagem = useCallback(
    async (destino: Local) => {
      if (!userLocation) return;

      const tempos: TempoViagem[] = [];
      const directionsService = new google.maps.DirectionsService();

      for (const { modo } of modosTransporte) {
        try {
          const result = await new Promise<google.maps.DirectionsResult>(
            (resolve, reject) => {
              directionsService.route(
                {
                  origin: userLocation,
                  destination: { lat: destino.lat, lng: destino.lng },
                  travelMode: modo as google.maps.TravelMode,
                },
                (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK && result) {
                    resolve(result);
                  } else {
                    reject(status);
                  }
                }
              );
            }
          );

          const rota = result.routes[0].legs[0];
          tempos.push({
            modo,
            duracao: rota.duration?.text || "",
            distancia: rota.distance?.text || "",
          });
        } catch (error) {
          console.error(`Erro ao calcular rota para ${modo}:`, error);
        }
      }

      setTemposViagem(tempos);
    },
    [userLocation]
  );

  const translateText = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
          }),
        }
      );

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Erro na tradução:", error);
      return text; // Retorna o texto original em caso de erro
    }
  };

  const buscarLocais = useCallback(() => {
    if (!map || !google.maps.places) return;

    const service = new google.maps.places.PlacesService(map);
    const center = userLocation || BELEM_CENTER;

    const request = {
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: searchRadius,
      type: "hospital",
      keyword: "hospital OR UPA OR UBS OR clínica",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const locais = results.map((place) => ({
          id: place.place_id!,
          nome: place.name!,
          lat: place.geometry!.location!.lat(),
          lng: place.geometry!.location!.lng(),
          endereco: place.vicinity,
          aberto: place.opening_hours?.isOpen(),
        }));
        setPlaces(locais);
      }
    });
  }, [map, userLocation, searchRadius]);

  const tracarRota = useCallback(
    async (destino: Local) => {
      if (!userLocation) {
        alert("Permita o acesso à sua localização para traçar a rota");
        return;
      }

      // Limpa a rota anterior imediatamente
      setDirections(null);
      setSelectedLocal(destino);

      // Calcula os tempos de viagem em paralelo
      calcularTemposViagem(destino);

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: userLocation,
          destination: { lat: destino.lat, lng: destino.lng },
          travelMode: modoTransporteSelecionado as google.maps.TravelMode,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            setMenuAberto(false);
            if (voiceGuidanceActive) {
              speakDirections(result);
            }
            startWatchingPosition();
          } else {
            alert("Não foi possível calcular a rota");
          }
        }
      );
    },
    [
      userLocation,
      voiceGuidanceActive,
      modoTransporteSelecionado,
      calcularTemposViagem,
    ]
  );

  // Adicione este componente para exibir os tempos de viagem
  const InfoTemposViagem = () => (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-24 md:w-64 bg-white p-4 rounded-lg shadow-lg z-40">
      <h3 className="font-bold mb-2">Tempo estimado por transporte:</h3>
      <div className="space-y-2">
        {temposViagem.map(({ modo, duracao, distancia }) => {
          const modoInfo = modosTransporte.find((m) => m.modo === modo);
          return (
            <button
              key={modo}
              onClick={() => {
                setModoTransporteSelecionado(modo);
                if (selectedLocal) tracarRota(selectedLocal);
              }}
              className={`w-full flex items-center justify-between p-2 rounded ${
                modoTransporteSelecionado === modo
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>
                {modoInfo?.icone} {modoInfo?.label}
              </span>
              <span className="text-sm text-gray-600">
                {duracao} ({distancia})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const speakDirections = async (result: google.maps.DirectionsResult) => {
    if (!window.speechSynthesis) {
      const message =
        selectedLanguage === "pt-BR"
          ? "Seu navegador não suporta a síntese de fala."
          : "Your browser does not support speech synthesis.";
      alert(message);
      return;
    }

    const steps = result.routes[0].legs[0].steps;
    if (stepIndex < steps.length) {
      let instructions = steps[stepIndex].instructions;

      // Traduz as instruções se necessário
      if (selectedLanguage === "en") {
        instructions = await translateText(instructions, "en");
      }

      const utterance = new SpeechSynthesisUtterance(instructions);
      utterance.lang = selectedLanguage; // Define o idioma da fala
      utterance.onend = () => {
        setStepIndex(stepIndex + 1);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const centralizarNoUsuario = () => {
    setIsLoading(true);
    // Não vamos limpar o erro aqui para evitar flash

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setLocationError(null); // Limpa o erro apenas após sucesso

          if (map) {
            map.panTo(newLocation);
            map.setZoom(15);
          }

          setIsLoading(false);
          buscarLocais();
        },
        (error) => {
          // Só mostra erro se realmente não conseguir obter a localização
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("Permissão de localização negada.");
          } else if (!userLocation) {
            setLocationError("Não foi possível obter sua localização.");
          }
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  const limparRota = () => {
    setDirections(null);
    setSelectedLocal(null);
    setStepIndex(0);
    window.speechSynthesis.cancel();
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const startWatchingPosition = () => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setLocationError(null); // Limpa o erro após sucesso

          if (map) {
            map.panTo(newLocation);
          }

          if (directions) {
            updateRoute(newLocation);
          }
        },
        (error) => {
          // Só mostra erro em caso de negação de permissão
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("Permissão de localização negada.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
      setWatchId(id);
    }
  };

  const updateRoute = useCallback(
    (newLocation: LatLngLiteral) => {
      if (!selectedLocal) return;

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: newLocation,
          destination: { lat: selectedLocal.lat, lng: selectedLocal.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            if (voiceGuidanceActive) {
              provideRealTimeVoiceGuidance(result, newLocation);
            }
          } else {
            console.error("Erro ao atualizar a rota:", status);
          }
        }
      );
    },
    [selectedLocal, voiceGuidanceActive]
  );

  const provideRealTimeVoiceGuidance = async (
    result: google.maps.DirectionsResult,
    newLocation: LatLngLiteral
  ) => {
    if (!window.speechSynthesis) {
      const message =
        selectedLanguage === "pt-BR"
          ? "Seu navegador não suporta a síntese de fala."
          : "Your browser does not support speech synthesis.";
      alert(message);
      return;
    }

    const steps = result.routes[0].legs[0].steps;
    if (stepIndex < steps.length) {
      const nextStep = steps[stepIndex];
      const nextStepDistance = nextStep.distance
        ? nextStep.distance.value
        : 1000;

      const distanceToNextStep =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(newLocation.lat, newLocation.lng),
          nextStep.start_location
        );

      if (distanceToNextStep <= nextStepDistance / 10) {
        let instructions = nextStep.instructions;

        // Traduz as instruções se necessário
        if (selectedLanguage === "en") {
          instructions = await translateText(instructions, "en");
        }

        const utterance = new SpeechSynthesisUtterance(instructions);
        utterance.lang = selectedLanguage;
        utterance.onend = () => {
          setStepIndex(stepIndex + 1);
        };
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const toggleVoiceGuidance = () => {
    setVoiceGuidanceActive(!voiceGuidanceActive);
    if (!voiceGuidanceActive && directions) {
      speakDirections(directions);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      setIsLoading(false);
      buscarLocais();
    },
    [buscarLocais]
  );

  const onMapIdle = useCallback(() => {
    if (voiceGuidanceActive && directions) {
      provideRealTimeVoiceGuidance(directions, userLocation!);
    }
  }, [voiceGuidanceActive, directions, userLocation]);

  const mapOptions = {
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: false, // Desabilitado em mobile
    fullscreenControl: false, // Desabilitado em mobile
    tilt: voiceGuidanceActive ? 45 : 0, // Inclina o mapa se a orientação de voz estiver ativa
  };

  return (
    <div className="w-full h-screen relative">
      {/* Seletor de idioma */}
      <div className="absolute top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg">
        <select
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(e.target.value as "pt-BR" | "en")
          }
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="pt-BR">Português (BR)</option>
          <option value="en">English</option>
        </select>
      </div>
      {/* Botão de menu mobile */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="absolute top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg md:hidden"
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
      >
        {menuAberto ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Painel lateral responsivo */}
      <div
        className={`fixed md:absolute top-0 left-0 z-40 w-full md:w-80 h-full md:h-auto 
                   bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                   ${menuAberto ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                   md:static md:transform-none md:top-4 md:left-4 md:max-h-[80vh]
                   overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Unidades de Saúde Próximas</h2>

          {/* Seletor de raio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Raio de busca
            </label>
            <select
              value={searchRadius}
              onChange={(e) => {
                setSearchRadius(Number(e.target.value));
                buscarLocais();
              }}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value={1000}>1 km</option>
              <option value={1500}>1.5 km</option>
              <option value={2000}>2 km</option>
              <option value={5000}>5 km</option>
            </select>
          </div>

          {/* Lista de lugares */}
          <div className="space-y-2">
            {places.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhuma unidade de saúde encontrada próxima.
              </p>
            )}
            {places.map((local) => (
              <div
                key={local.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="font-medium">{local.nome}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {local.endereco}
                </div>
                {local.aberto !== undefined && (
                  <div
                    className={`text-sm mt-1 ${local.aberto ? "text-green-600" : "text-red-600"}`}
                  >
                    {local.aberto ? "Aberto" : "Fechado"}
                  </div>
                )}
                <button
                  onClick={() => tracarRota(local)}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                           transition-colors text-sm font-medium focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2"
                >
                  Traçar Rota
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botões de controle */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => {
            buscarLocais();
          }}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          title="Atualizar lugares"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <button
          onClick={centralizarNoUsuario}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          title="Minha localização"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
        </button>

        {directions && (
          <button
            onClick={limparRota}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
            title="Limpar rota"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {directions && (
          <button
            onClick={toggleVoiceGuidance}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
            title={
              voiceGuidanceActive
                ? "Desativar orientação de voz"
                : "Ativar orientação de voz"
            }
          >
            {voiceGuidanceActive ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1V4a1 1 0 011-1h11.586a1 1 0 01.707.293l5.414 5.414a1 1 0 010 1.414l-5.414 5.414A1 1 0 0116.586 15H16a1 1 0 01-1-1v-4a1 1 0 011-1h.586z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072M18.036 5.464a9 9 0 010 12.867M8.464 15.536a5 5 0 007.072 0M5.464 18.036a9 9 0 0012.867 0"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Mapa */}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={BELEM_CENTER}
          zoom={13}
          onLoad={onMapLoad}
          onIdle={onMapIdle}
          options={mapOptions}
        >
          {directions && <DirectionsRenderer directions={directions} />}

          {userLocation && !directions && (
            <Marker
              position={userLocation}
              title="Você está aqui"
              options={{
                icon: {
                  url: "/mnt/data/boneco-fixo.png",
                  scaledSize: new google.maps.Size(42, 42), // Diminuindo um pouco
                  anchor: new google.maps.Point(21, 42), // Ajustando o ponto de ancoragem
                  strokeColor: "#1E40AF", // Contorno em azul mais escuro (blue-800)
                  strokeWeight: 2, // Espessura do contorno
                  fillColor: "#3B82F6", // Mantendo o azul do aplicativo (blue-500)
                },
              }}
            />
          )}

          {userLocation && directions && (
            <Marker
              position={userLocation}
              title="Você está aqui"
              options={{
                icon: {
                  url: "/mnt/data/boneco-fixo-2.png",
                  scaledSize: new google.maps.Size(42, 42), // Diminuindo um pouco
                  anchor: new google.maps.Point(21, 42), // Ajustando o ponto de ancoragem
                },
              }}
            />
          )}

          {!directions &&
            places.map((local) => (
              <Marker
                key={local.id}
                position={{ lat: local.lat, lng: local.lng }}
                title={local.nome}
                options={{
                  icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  },
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>

      {directions && temposViagem.length > 0 && <InfoTemposViagem />}

      {/* Loading e mensagens de erro */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="text-xl">
            {selectedLanguage === "pt-BR"
              ? "Carregando mapa..."
              : "Loading map..."}
          </div>
        </div>
      )}

      {locationError && (
        <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-50 md:absolute">
          {selectedLanguage === "pt-BR"
            ? locationError
            : "Could not get your location."}
        </div>
      )}
    </div>
  );
};

export default MapaLocais;
