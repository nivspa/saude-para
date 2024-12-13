const PaginaPerfil: React.FC = () => {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src="image.png" // Usando a imagem anexada
              alt="Foto de Perfil"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nome</span>
              <span className="font-medium">Daniel Moraes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Idade</span>
              <span className="font-medium">35 anos</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">E-mail</span>
              <span className="font-medium">daniel.moraes@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Telefone</span>
              <span className="font-medium">(91) 98765-4321</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Endereço</span>
              <span className="font-medium">Rua das Flores, 123, Belém - PA</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaginaPerfil;