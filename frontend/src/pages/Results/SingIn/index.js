import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from "../../services/api";

const SingIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSingIn = async e => {
        e.preventDefault();
        const { email, password } = e;

        if (!email || !password) {
            toast.error("Informe um e-mail e uma senha para efetuar login.");
        } else {
            try {
                const response = await api.post("/sessions", { email, password });
                login(response.data.token);
                this.props.history.push("/");
            } catch (error) {
                toast.error("Houve um problema com o login. Verifique suas credencias e tente novamente.");
            }
        }
    }
    return ()
};

export default SingIn;