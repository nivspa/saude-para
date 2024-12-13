import React, { useCallback, useEffect } from "react";

type Idioma = "pt-BR" | "en-US";

interface VozConfig {
  idioma: Idioma;
  genero: "MALE" | "FEMALE";
  nome: string;
}

interface TextToSpeechRequest {
  input: {
    text: string;
  };
  voice: {
    languageCode: string;
    ssmlGender: "MALE" | "FEMALE";
    name: string;
  };
  audioConfig: {
    audioEncoding: string;
    speakingRate: number;
    pitch: number;
    volumeGainDb: number;
    effectsProfileId: string[];
  };
}

interface TextToSpeechRequest {
  input: {
    text: string;
  };
  voice: {
    languageCode: string;
    ssmlGender: "MALE" | "FEMALE";
    name: string;
  };
  audioConfig: {
    audioEncoding: string;
    speakingRate: number;
    pitch: number;
    volumeGainDb: number;
    effectsProfileId: string[];
  };
}

interface GoogleTextToSpeechResponse {
  data: {
    audioContent: string;
  };
}

interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
}

interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
}

interface ServicoVozProps {
  children: React.ReactNode;
}

interface VozContextType {
  falar: (texto: string, idioma?: Idioma) => Promise<void>;
  falarComTraducao: (
    texto: string,
    idiomaOrigem: Idioma,
    idiomaDestino: Idioma
  ) => Promise<void>;
  pausar: () => void;
  retomar: () => void;
  parar: () => void;
  getEstado: () => AudioState;
}

const VozContext = React.createContext<VozContextType | null>(null);

const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const VOZES_PADRAO: Record<Idioma, VozConfig> = {
  "pt-BR": {
    idioma: "pt-BR",
    genero: "FEMALE",
    nome: "pt-BR-Standard-A",
  },
  "en-US": {
    idioma: "en-US",
    genero: "FEMALE",
    nome: "en-US-Standard-C",
  },
};

class ServicoVoz {
  private audioContext: AudioContext | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private audioCache: Map<string, AudioBuffer> = new Map();
  private estado: AudioState = {
    isPlaying: false,
    isPaused: false,
  };

  constructor() {
    if (typeof window !== "undefined") {
      this.inicializarAudioContext();
    }
  }

  private async inicializarAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  async falar(texto: string, idioma: Idioma = "pt-BR"): Promise<void> {
    try {
      const cacheKey = `${idioma}-${texto}`;
      let audioBuffer = this.audioCache.get(cacheKey);

      if (!audioBuffer) {
        const vozConfig = VOZES_PADRAO[idioma];
        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_API_KEY}`;

        const requestBody: TextToSpeechRequest = {
          input: { text: texto },
          voice: {
            languageCode: vozConfig.idioma,
            ssmlGender: vozConfig.genero,
            name: vozConfig.nome,
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 1.0,
            pitch: 0,
            volumeGainDb: 0,
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
          },
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = (await response.json()) as GoogleTextToSpeechResponse;
        audioBuffer = await this.decodificarAudio(data.data.audioContent);
        this.audioCache.set(cacheKey, audioBuffer);
      }

      await this.reproduzirAudio(audioBuffer);
    } catch (error) {
      console.error("Erro ao sintetizar fala:", error);
      this.usarSinteseFallback(texto, idioma);
    }
  }

  private async decodificarAudio(audioContent: string): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error("AudioContext não inicializado");
    }

    const audioData = atob(audioContent);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);

    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }

    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  private async reproduzirAudio(audioBuffer: AudioBuffer): Promise<void> {
    if (!this.audioContext) {
      throw new Error("AudioContext não inicializado");
    }

    if (this.sourceNode) {
      this.sourceNode.stop();
      this.sourceNode.disconnect();
    }

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = audioBuffer;
    this.sourceNode.connect(this.audioContext.destination);

    this.estado.isPlaying = true;
    this.estado.isPaused = false;

    return new Promise((resolve) => {
      if (this.sourceNode) {
        this.sourceNode.onended = () => {
          this.estado.isPlaying = false;
          resolve();
        };
        this.sourceNode.start(0);
      }
    });
  }

  private usarSinteseFallback(texto: string, idioma: Idioma): void {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = idioma;
      utterance.rate = 1.0;
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
      this.estado.isPlaying = true;
      this.estado.isPaused = false;
    }
  }

  pausar(): void {
    if (this.audioContext && this.estado.isPlaying && !this.estado.isPaused) {
      this.audioContext.suspend();
      this.estado.isPaused = true;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }

  retomar(): void {
    if (this.audioContext && this.estado.isPaused) {
      this.audioContext.resume();
      this.estado.isPaused = false;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }

  parar(): void {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    this.audioCache.clear();
    this.estado.isPlaying = false;
    this.estado.isPaused = false;
  }

  getEstado(): AudioState {
    return { ...this.estado };
  }
}

export const servicoVoz = new ServicoVoz();

export const VozProvider: React.FC<ServicoVozProps> = ({ children }) => {
  useEffect(() => {
    // Inicializa e carrega as vozes quando o componente montar
    if ("speechSynthesis" in window) {
      // Força o carregamento inicial das vozes
      window.speechSynthesis.getVoices();

      // Monitora mudanças nas vozes disponíveis
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        window.speechSynthesis.getVoices();
      });
    }

    // Cleanup quando o componente desmontar
    return () => {
      servicoVoz.parar();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const falarComTraducao = useCallback(
    async (
      texto: string,
      idiomaOrigem: Idioma,
      idiomaDestino: Idioma
    ): Promise<void> => {
      try {
        if (idiomaOrigem !== idiomaDestino) {
          const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_API_KEY}`;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: texto,
              source: idiomaOrigem,
              target: idiomaDestino,
              format: "text",
            }),
          });

          if (!response.ok) {
            throw new Error(`Erro na tradução: ${response.status}`);
          }

          const data = await response.json();
          const textoTraduzido = data.data.translations[0].translatedText;
          await servicoVoz.falar(textoTraduzido, idiomaDestino);
        } else {
          await servicoVoz.falar(texto, idiomaDestino);
        }
      } catch (error) {
        console.error("Erro na tradução e fala:", error);
        servicoVoz.falar(texto, idiomaOrigem);
      }
    },
    []
  );

  const value = {
    falar: servicoVoz.falar.bind(servicoVoz),
    falarComTraducao,
    pausar: servicoVoz.pausar.bind(servicoVoz),
    retomar: servicoVoz.retomar.bind(servicoVoz),
    parar: servicoVoz.parar.bind(servicoVoz),
    getEstado: servicoVoz.getEstado.bind(servicoVoz),
  };

  return <VozContext.Provider value={value}>{children}</VozContext.Provider>;
};

export const useVoz = (): VozContextType => {
  const context = React.useContext(VozContext);
  if (!context) {
    throw new Error("useVoz deve ser usado dentro de um VozProvider");
  }
  return context;
};

export default VozProvider;
