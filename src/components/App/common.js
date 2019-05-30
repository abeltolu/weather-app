import styled from 'styled-components';

export const Header = styled.header`
font-size: 20px;
color: #fff;
margin-bottom: 20px;
`;

export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    border-radius: 5px;
`;

export const Input = styled.input`
flex: 1;
outline: 0;
border: none;
font-size: 14px;
height: 40px;
padding: 0 10px;
text-transform: capitalize;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
`;

export const Button = styled.button`
outline: none;
border: none;
cursor: pointer;
font-size: 14px;
padding: 0 20px;
color: #fff;
background-color: #333;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;

:hover {
    background: red;
}
`;