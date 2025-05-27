import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/register.jsx";
import { Login } from "../pages/login/login.jsx";
import { Inicial } from "../pages/inicial.jsx";
import { Gerenciamento } from "../pages/gerenciamento.jsx";
import React, { lazy, Suspense } from "react";

export function Rotas(){

    const Home = lazy(() => import('../pages/home/home.jsx'));
    const SensorContent = lazy(() => import('../pages/sensores/sensor.jsx'));
    const HistoricoContent = lazy(() => import('../pages/historico/historico.jsx'));
    const AmbienteContent = lazy(() => import('../pages/ambiente/ambiente.jsx'));

    return(
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route path="/app" element={<Inicial/>}>
                <Route index element={
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Home/>
                    </Suspense>
                    } />

                    <Route path="gerenciamento" element={<Gerenciamento />}>
                        <Route index element={
                            <Suspense fallback={<div>Carregando...</div>}>
                                <SensorContent />
                            </Suspense>
                        }/>

                        <Route path="historico" element={
                            <Suspense fallback={<div>Carregando...</div>}>
                                <HistoricoContent />
                            </Suspense>
                        }/>

                        <Route path="ambiente" element={
                            <Suspense fallback={<div>Carregando...</div>}>
                                <AmbienteContent />
                            </Suspense>
                        }/>
                    </Route>
            </Route>
        </Routes>
    )
}