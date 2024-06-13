import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantForm from '../PlantForm/PlantForm';

function PlantList() {
    const dispatch = useDispatch();

    const plantReducer = useSelector(store => store.plantReducer);

    useEffect(() => {
        getPlanty();
    }, []);

    const getPlanty = () => {

        dispatch({type: 'FETCH_PLANT'})

        /*
        axios({
            method: 'GET',
            url: '/api/fruit'
        }).then((response) => {
            const action = { type: 'SET_BASKET', payload: response.data };
            dispatch(action);
        }).catch((error) => {
            alert('Unable to get basket from server');
        });
        */
    }

    const removeItem = (id) => {
        axios({
            method: 'DELETE',
            url: `/api/plants/${id}`
        }).then((response) => {
            getPlanty();
        }).catch((error) => {
            console.log(error);
            alert('Unable to delete item');
        });  
    }

    return (
        <ul>
            {plantReducer.map((plantItem) => {
                return (
                    <div>
                    <li key={plantItem.id}>Plants: {plantItem.name}
                    <button onClick={() => removeItem(plantItem.id)}>Remove</button>
                    </li>
                    
                    </div>
                );
            })}
        </ul>
    )
}

export default PlantList;
