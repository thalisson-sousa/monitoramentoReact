import styled from 'styled-components';

export const Container = styled.div`
  display: flex; // Você pode definir flex se necessário, mas não precisa condicionar aqui
  flex-direction: column;
  background-color: #1A202C; 
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;
  text-decoration: none;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: black;
  }
`;
