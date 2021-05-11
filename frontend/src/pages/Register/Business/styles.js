import { Button } from 'reactstrap';
import styled, { css } from 'styled-components';
import Background from '../../../assets/bg-image-registerBusiness.jpg';

export const Container = styled.div`
  width: auto;
  height: 100%;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${Background});
`;

export const Register = styled.div`
  height: 100%;
  width: 40%;
  background-color: white;
  opacity: 70%;
  padding: 30px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

export const ButtonStyle = styled(Button)`
  margin: 1rem;
  color: #34669a;
  border-radius: 1rem;
  border-color: #34669a;

  :hover {
    background-color: #34669a;
    border-color: #34669a;
  }
`;

export const FormButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
