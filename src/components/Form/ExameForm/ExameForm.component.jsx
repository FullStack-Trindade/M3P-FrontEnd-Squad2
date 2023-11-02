import InputComponent from "../../Input/Input.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Service from "../../../services/Exame/ExameService";
import { useNavigate } from "react-router-dom";
import * as Styled from "../../Button/button.style";
import { Container, Row, Col } from "react-bootstrap";

export default function ExameForm() {
  const [exame, setExame] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
  async () => {
      await service.Get(id).then((response) => {
        setExame(response);
        Object.entries(response).map(([key, value]) => {
          setValue(key, value);
        });
      });
    };
  }, [ setValue]);



  const service = new Service();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm();
 
 
 const onSubmit = async (data) => {
    if (!isValid) {
      alert("Erro, tente novamente");
    } else {
      let token =localStorage.getItem('@Auth:token')
      await service
        .Create(data,token)
        .then((response) =>
          alert(`Exame ${response.nomeExame} criado com sucesso.`)
        );
      reset();
    }
  };

 /*  const save = async (data,token) => {
  
  };

  const editar = async (data) => {
    const body = {
      ...exame,
      ...data,
    };
    await service
      .Update(exame.id, data)
      .then((response) =>
        alert(`Exame ${response.nomeExame} atualizado com sucesso.`)
      );
    reset();
  };

  const deletar = async () => {
    await service.Delete(exame.id);
  };
 */


  

  return (
    <>
      {" "}
      <Container fluid="md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <InputComponent
              label="Nome do Exame:"
              type="text"
              id="nomeExame"
              placeholder="Ultrassonografia"
              register={register("nomeExame", {
                required: "Este campo é obrigatorio",
              })}
              error={errors.nomeExame}
            />
          </Row>
          <Row>
            <Col>
              <InputComponent
                label="Data do Exame:"
                type="date"
                id="dataExame"
                placeholder=""
                register={register("dataExame", {
                  required: "Este campo é obrigatorio",
                })}
                error={errors.dataExame}
              />
            </Col>
            <Col>
              <InputComponent
                step="1"
                label="Horario do Exame:"
                id="horaExame"
                type="time"
                register={register("horaExame", {
                  required: "Este campo é obrigatório",
                })}
                error={errors.horaExame}
              />
            </Col>

            <Col>
              <InputComponent
                label="Tipo do Exame:"
                type="text"
                id="tipoExame"
                register={register("tipoExame", {
                  required: "Este campo é obrigatorio",
                })}
                error={errors.tipoExame}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputComponent
                label="Laboratório:"
                type="text"
                id="laboratorio"
                register={register("laboratorio", {
                  required: "Este campo é obrigatorio",
                })}
                error={errors.laboratorio}
              />
            </Col>
            <Col>
              <InputComponent
                label="URL para documento:"
                type="text"
                id="docurl"
                register={register("docurl")}
              />
            </Col>
          </Row>

          <InputComponent
            label="Resultados:"
            type="text"
            rows={4}
            id="resultados"
            register={register("resultados", {
              required: "Este campo é obrigatorio",
            })}
            error={errors.resultados}
          />
          <Row>
            <Col>
              <InputComponent
                label="Paciente Id:"
                type="text"
                id="paciente_id"
                register={register("paciente_id", {
                  required: "Este campo é obrigatorio",
                })}
                error={errors.PacienteId}
              />
            </Col>
            <Col>
              <InputComponent
                className="col-3"
                label="Status do Sistema:"
                type="boolean"
                id="statusSistema"
                register={register("statusSistema", {
                  required: "Este campo é obrigatorio",
                })}
                error={errors.statusSistema}
              />
            </Col>
          </Row>
          <Row className="d-flex">
            <Col md={4} sm={4}>
              <Styled.Btn variant="primary" type="submit">
                Salvar Exame

              </Styled.Btn>
            </Col>
            <Col md={4} sm={4}>
              <Styled.Btn variant="blue" type="button" onClick={editar}>
                Editar Exame
              </Styled.Btn>
            </Col>
            <Col md={4} sm={4}>
              <Styled.Btn variant="red" type="button" onClick={deletar}>
                Excluir Exame
              </Styled.Btn>
            </Col>
          </Row>
        </form>{" "}
      </Container>
    </>
  );
}
