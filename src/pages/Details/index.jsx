import { Container, Links, Content } from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tag } from "../../components/Tag";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { api } from "../../service/api";

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);

  function handleBack() {
    navigate(-1);
  }
  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota ? ");
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />

            <h1>{data.title}</h1>

            <p>{data.description}</p>
            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
