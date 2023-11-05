import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import ConsultaService from '../../../services/CadastroConsulta/CadastroConsultaService';
import InputComponent from '../../Input/Input.component';
import { BtnCustom } from "../CadastroConsultaForm/CadastroConsultaStyled";
import {  EqualDivider, Form} from '../PacienteForm/PacienteForm.styled';
import { SelectCostum } from '../CadastroExercicioForm/CadastroExercicioForm.Style';


function CadastroConsultaForm  ({ isEditing = false })  {
  const { id } = useParams();
  const { control, setValue, reset, handleSubmit } = useForm();
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODg4MjM2MywiZXhwIjoxNjk4OTY4NzYzfQ.AKLEbojUaY0Drp288h0rPud0pe01SB9ZREcUu8_a1_w"
  
// Define o estado de edição com base no ID da rota
  useEffect(() => {
    if (id) {
      // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do paciente
      const fetchConsultaDetails = async () => {
        try {
          const response = await ConsultaService.getConsultaPorId(id, token);
          if (response) {
            // Define os detalhes do paciente nos campos do formulário
            const consulta = response;
            Object.keys(consulta).forEach((key) => {
              setValue(key, consulta[key]);
            });
          }
        } catch (error) {
          console.error('Erro ao buscar detalhes da consulta:', error);
        }
      };

      fetchConsultaDetails();
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        // Se há um ID, estamos em modo de edição
        
        await ConsultaService.atualizarConsulta(id, data, token);
        toast.success(
          `Consulta do paciente ${data.nome_completo} atualizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 2000,
          }
        );
      } else {
        //adiciona o status PADRÃO ao data
        setStatus(true);
        data = { ...data, status };
        // Caso contrário, estamos criando um novo paciente
        const response = await ConsultaService.criarConsulta(data, token);
        toast.success(
          `Cadastro da consulta do paciente: ${response.nome_completo} realizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 2000,
          }
        );
        navigate('/editaconsulta/' + response.id);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || 'Erro desconhecido';
        toast.error(`Erro 409: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      } else {
        toast.error(`Erro ao cadastrar consulta do paciente ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      }
    }
  };

  const onDeleteConsulta = async () => {
    try {
      await ConsultaService.excluirConsulta(id, token);
      toast.success(`Exclusão da consulta realizada com sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        autoClose: 2000,
      });
      navigate('/cadastroconsulta');
    } catch (error) {
      toast.error(`Erro ao excluir a consulta do paciente: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        autoClose: 2000,
      });
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!isEditing) {
      setValue('DataConsulta', getCurrentDate());
      setValue('horarioConsulta', getCurrentTime());
    }
  }, [isEditing, setValue]);

  return (
    
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <EqualDivider>
          <InputComponent
            label="Motivo da consulta"
            name="motivoConsulta"
            control={control}
            type="text"
            rules={{
                required: 'Motivo da consulta é obrigatório',
                minLength: { value: 8, message: 'Mínimo de 8 caracteres' },
                maxLength: { value: 64, message: 'Máximo de 64 caracteres' },
              }}
          />
          <InputComponent
            label="Data da Consulta"
            name="DataConsulta"
            control={control}
            type="Date"
            rules={{ required: 'Data da Consulta é obrigatória' }}
          />
          <InputComponent
            label="Horario da Consulta"
            name="horarioConsulta"
            control={control}
            type="Time"
            rules={{ required: 'Horário da Consulta é obrigatório' }}
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Descrição do problema"
            name="descricaoDoProblema"
            control={control}
            type="text"
            rules={{
                required: 'Descrição do problema é obrigatória',
                minLength: { value: 16, message: 'Mínimo de 16 caracteres' },
                maxLength: { value: 1024, message: 'Máximo de 1024 caracteres' },
              }}
          />
          <InputComponent
            label="Medicação receitada"
            name="medicacionReceitada"
            control={control}
            type="text"
          />
          <InputComponent
            label="Dosagem e Precauções"
            name="dosagemEprec"
            control={control}
            type="text"
            rules={{
                required: 'Dosagem e Precauções são obrigatórias',
                minLength: { value: 16, message: 'Mínimo de 16 caracteres' },
                maxLength: { value: 256, message: 'Máximo de 256 caracteres' },
              }}
          />
        </EqualDivider>
        <EqualDivider>
       
          <SelectCostum name="statusSistema" id="status" disabled={!isEditing} required={'Status do sistema é obrigatorio'}>
            <option value="">Status do sistema</option>
            <option value="true"> Ativo </option>
            <option value="false"> Inativo </option>
        
          </SelectCostum>
        </EqualDivider>
        <EqualDivider>
          {isEditing ? (
            <>
              <BtnCustom variant="blue" type="submit">
                Editar Consulta
              </BtnCustom>
              <BtnCustom variant="red" type="button" onClick={onDeleteConsulta}>
                Excluir Consulta
              </BtnCustom>
            </>
          ) : (
            <BtnCustom variant="primary" type="submit">
              Enviar Consulta
            </BtnCustom>
          )}
        </EqualDivider>
      </Form>
    
  );
}
export default CadastroConsultaForm;

CadastroConsultaForm.propTypes = {
    isEditing: PropTypes.bool,
  };

