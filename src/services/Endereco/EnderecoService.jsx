const enderecoService = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
  
    if (response.ok && !data.erro) {
      const { logradouro, bairro, localidade, uf } = data;
      return {
        logradouro,
        bairro,
        cidade: localidade,
        estado: uf,
      };
    } else {
      alert('CEP inválido ou não encontrado.');
    }
  };
  
  export default enderecoService;