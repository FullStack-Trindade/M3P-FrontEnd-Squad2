import { Api } from "./api" // Importe a instância da Api

const MedicamentoService = {
	async Create(medicamento, token) {
		const response = await Api.post("/medicamentos", medicamento, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			let errorMessage = "Erro desconhecido"
			const erroData = await response.json()
			if (erroData) {
				if (erroData.message) {
					errorMessage = erroData.message
				} else if (erroData.errors && Array.isArray(erroData.errors)) {
					const errorMessages = erroData.errors
						.map((error) => error.message)
						.join(", ")
					errorMessage = errorMessages
				}
			}
			throw new Error(errorMessage)
		}
	},

	async Update(id, exame, token) {
		const response = await Api.put(`/medicamentos/${id}`, exame, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			let errorMessage = "Erro desconhecido"
			const erroData = await response.json()
			if (erroData) {
				if (erroData.message) {
					errorMessage = erroData.message
				} else if (erroData.errors && Array.isArray(erroData.errors)) {
					const errorMessages = erroData.errors
						.map((error) => error.message)
						.join(", ")
					errorMessage = errorMessages
				}
			}
			throw new Error(errorMessage)
		}
	},

	async GetAll(token) {
		const response = await Api.get(`/medicamentos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			const data = await response.json()
			console.log("dados retornados no get por id:", data)
			return data
		} else {
			let errorMessage = "Erro desconhecido"
			const erroData = await response.json()
			if (erroData) {
				if (erroData.message) {
					errorMessage = erroData.message
				} else if (erroData.errors && Array.isArray(erroData.errors)) {
					const errorMessages = erroData.errors
						.map((error) => error.message)
						.join(", ")
					errorMessage = errorMessages
				}
			}
			throw new Error(errorMessage)
		}
	},

	async BuscaPorNome(nome, token) {
		const response = await Api.get(`/medicamentos/${nome}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			const data = await response.json()
			console.log("dados retornados no get por id:", data)
			return data
		} else {
			let errorMessage = "Erro desconhecido"
			const erroData = await response.json()
			if (erroData) {
				if (erroData.message) {
					errorMessage = erroData.message
				} else if (erroData.errors && Array.isArray(erroData.errors)) {
					const errorMessages = erroData.errors
						.map((error) => error.message)
						.join(", ")
					errorMessage = errorMessages
				}
			}
			throw new Error(errorMessage)
		}
	},

	async Excluir(id, token) {
		const response = await Api.delete(`/medicamentos/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			let errorMessage = "Erro desconhecido"
			const erroData = await response.json()
			if (erroData) {
				if (erroData.message) {
					errorMessage = erroData.message
				}
			}
			throw new Error(errorMessage)
		}
	},
}

export default MedicamentoService
