import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: fit-content;
  background: #f8f8fb;
  position: relative;
  display: flex;
`;

export const Container = styled.div`
  height: auto;
  width: 94vw;
  margin-left: 4vw;
  margin-top: 10vh;
`;

export const Title = styled.h1`
  font-weight: 900;
`;

export const CategoryList = styled.div`
  height: auto;
  padding: 10px 0px;
  margin-bottom: 4vh;

  span {
    font-size: 1.2rem;
    vertical-align: middle;
  }
`;

export const Category = styled.div`
  height: fit-content;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 20px;
  margin-right: 20px;
  background-color: #34669a;
  color: #fff;
  display: inline-flex;
  align-items: center;
  box-shadow: 2px 4px 5px -2px #888888;
  font-weight: 400;
`;

export const Info = styled.div`
  background-color: #ffffff;
  height: 65vh;
  width: 65vw;
  box-shadow: 1px 2px 5px #888888;
  padding: 1em;
  float: left;
  margin-right: 4vw;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 77% 19%;
  grid-template-rows: 79% 19%;
  gap: 2% 4%;
  grid-template-areas:
    'Photo Contato'
    'Historia Locals';
`;

export const Photo = styled.div`
  grid-area: Photo;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`;

export const Details = styled.div`
  grid-area: Historia;
  padding-top: 2%;
`;

export const Contacts = styled.div`
  grid-area: Contato;
  padding-top: 5%;

  .h5 {
    padding-top: 0%;
  }
`;

export const Address = styled.div`
  grid-area: Locals;
  padding-top: 10%;
`;

export const Recommended = styled.div`
  float: left;
  background-color: #ffffff;
  height: 65vh;
  width: 50vh;
  box-shadow: 1px 2px 5px #888888;
  padding: 20px;
  border-radius: 10px;

  hr {
    margin-top: 5%;
    margin-bottom: 5%;
    border-color: #e1e6ee;
    width: 100%;
  }
`;

export const TitleRecommended = styled.h5`
  text-align: center;
`;

export const Highlights = styled.div`
  background-color: #e5e5e5;
  box-shadow: 1px 2px 5px #888888;
  padding: 10px 15px;
  margin: 10px;
  height: 9%;
  border-radius: 10px;
  font-size: 1vw;
`;

export const Name = styled.div`
  float: left;
  color: #777777;
  font-weight: 900;
`;

export const Rating = styled.div`
  float: right;
  color: #777777;
  font-weight: 600;
  display: inline-flex;
`;
