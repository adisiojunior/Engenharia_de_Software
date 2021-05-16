import React from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import { Conteiner } from './styled';

const Footer = () => {
  return (
    <Conteiner>
      <h3>
        <MdChatBubbleOutline /> Fale Conosco
      </h3>
      <h6>meipicui@gmail.com</h6>
      <h6>(83) 9 9821-8065</h6>
    </Conteiner>
  );
};

export default Footer;
