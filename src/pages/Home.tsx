/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { CenterChildren } from '../components/CenterChildren';
import { Title } from "../components/Title";
import { AppRoutes } from "../constants/reactConstants";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <CenterChildren>
      <Title />
      <Button onClick={() => navigate(AppRoutes.mainMenu)}>Enter</Button>
    </CenterChildren>
  )
}
