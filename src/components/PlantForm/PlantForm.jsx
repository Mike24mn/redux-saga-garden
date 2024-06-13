import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({
        name: '',
        kingdom: '',
        clade: '',
        order: '',
        family: '',
        subfamily: '',
        genus: ''
    });
    const handleNameChange = (event) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        const {name,value} = event.target
        setPlant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const addNewPlant = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''
        });
    }

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

    const removeItem = () => {
        axios({
            method: 'DELETE',
            url: `/api/plants/${newPlant.id}`
        }).then((response) => {
            getPlanty();
        }).catch((error) => {
            console.log(error);
            alert('Unable to delete item');
        });  
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input
                    type='text'
                    name='name'
                    value={newPlant.name}
                    onChange={handleNameChange}
                    placeholder='Name'
                />
                <input
                    type='text'
                    name='kingdom'
                    value={newPlant.kingdom}
                    onChange={handleNameChange}
                    placeholder='Kingdom'
                />
                <input
                    type='text'
                    name='clade'
                    value={newPlant.clade}
                    onChange={handleNameChange}
                    placeholder='Clade'
                />
                <input
                    type='text'
                    name='order'
                    value={newPlant.order}
                    onChange={handleNameChange}
                    placeholder='Order'
                />
                <input
                    type='text'
                    name='family'
                    value={newPlant.family}
                    onChange={handleNameChange}
                    placeholder='Family'
                />
                <input
                    type='text'
                    name='subfamily'
                    value={newPlant.subfamily}
                    onChange={handleNameChange}
                    placeholder='Subfamily'
                />
                <input
                    type='text'
                    name='genus'
                    value={newPlant.genus}
                    onChange={handleNameChange}
                    placeholder='Genus'
                />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default PlantForm;
