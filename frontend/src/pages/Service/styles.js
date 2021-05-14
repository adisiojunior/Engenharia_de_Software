import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: auto;
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
  grid-template-rows: 81% 17%;
  gap: 1% 4%;
  grid-template-areas:
    'Photo Contato'
    'Historia Locals';
`;

export const Photo = styled.div`
  grid-area: Photo;
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
  width: 25vw;
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

export const RecommendedTitle = styled.h5`
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

export const RecommendedName = styled.div`
  float: left;
  color: #777777;
  font-weight: 900;
`;

export const RecommendedRating = styled.div`
  float: right;
  color: #777777;
  font-weight: 600;
  display: inline-flex;
`;

export const Rating = styled.div`
  width: 65vw;
  background-color: #ffffff;
  margin-top: 4vh;
  float: left;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 1px 2px 5px #888888;
  margin-bottom: 6vh;
`;

export const RatingTitle = styled.div`
  font-weight: 900;
  padding-left: 2%;
  hr {
    margin-top: 5%;
    margin-bottom: 5%;
    border-color: #e1e6ee;
    width: 100%;
  }
`;

export const RatingPlace = styled.div`
  overflow: auto;
  min-height: 9.5rem;
  max-height: 19rem;
`;

export const UserRating = styled.div`
  height: 4rem;
  margin-top: 2em;
  img {
    height: 100%;
    width: 30%;
  }
`;

export const UserInfo = styled.div`
  width: 19%;
  float: left;
  height: 100%;
  display: flex;

  span {
    width: 100%;
    padding-top: 0.5rem;
    padding-left: 1rem;
    font-weight: 700;
  }
`;

export const UserComment = styled.div`
  width: 72%;
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-weight: 500;
`;

export const UserStars = styled.div`
  width: 7%;
  display: flex;
  height: 100%;
  align-items: flex-end;
  font-weight: 900;
  right: 0;
  padding-bottom: 0.5rem;
`;

export const EditButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #ddd;
`;