import { useState } from "react";
import frontApi from "../api/frontApi";

export const evaluationService = () => {

    const [ evaluationsList, setEvaluationsList ] = useState()
    const [ evaluationEmployee, setEvaluationEmployee ] = useState()

    const createEvaluation = async({ token, employeeId, evaluatorId, date, nameEvaluation, score, commets, status }) => {

        try {

            const response = await frontApi.post("/api/evaluations", {
                employeeId: employeeId,
                evaluatorId: evaluatorId,
                date: date,
                nameEvaluation: nameEvaluation,
                score: score,
                commets: commets,
                status: status,
              },{
                headers: {
                "x-token": token,
                },
            });
            console.log('Creacion de Evaluacion', response)
    
        } catch (error) {
    
            console.log(error);
    
        }

    }
    

    const getEvaluation = async(token) => {

        try {

            const response = await frontApi.get("/api/evaluations/evaluationsList", {
                headers: {
                "x-token": token,
                },
            });
            setEvaluationsList(response?.data)
    
        } catch (error) {
    
            console.log(error);
    
        }

    }

    const getEvaluationById = async( id, token ) => {

        try {

            const response = await frontApi.get(`/api/evaluations/${ id }`, {
                headers: {
                "x-token": token,
                },
            });
            console.log(response)
    
        } catch (error) {
    
            console.log(error);
    
        }

    }

    const updateEvaluations = async( id, token ) => {

        try {

            const response = await frontApi.put(`/api/evaluations/${ id }`, {
                headers: {
                "x-token": token,
                },
            });
            console.log(response)
    
        } catch (error) {
    
            console.log(error);
    
        }

    }

    const getEvaluationEmployee = async( id, token ) => {

        try {

            const response = await frontApi.get(`/api/evaluations/employee/${ id }`, {
                headers: {
                "x-token": token,
                },
            });
            setEvaluationEmployee(response?.data)
    
        } catch (error) {
    
            console.log(error);
    
        }

    }

    return {
        evaluationsList,
        evaluationEmployee,
        
        createEvaluation,
        getEvaluation,
        getEvaluationById,
        updateEvaluations,
        getEvaluationEmployee
    }
}