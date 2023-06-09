//Esta es la base url del servidor
const baseURL = "http://localhost:4000/"

//Peticion Get de los valores actuales
export const getCurrentValues = async (setDoorState, setThermometerState) => {
    await fetch(baseURL + "current_values")
        .then((response) => response.json())
        .then((data) => {
            //Validar que el array no devuelva un array vacio, en caso de que lo haga se asigna un array con los valores inciales
            if (data.data.length <= 0) {
                setDoorState(false);
                setThermometerState(false);
                postCurrentValues();
            } else {
                data.data.map((i) => {
                    if (i.name === "door") {
                        i.currentValue === 1 ? (setDoorState(true)) : (setDoorState(false));
                    }
                    if (i.name === "thermometer") {
                        i.currentValue === 1 ? (setThermometerState(true)) : (setThermometerState(false));
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


//Peticion Post de las puertas
export const postCurrentValues = async () => {
    const form = [{ id: 1, name: "door", currentValue: 0, date: new Date().toISOString() }, { id: 2, name: "thermometer", currentValue: 0, date: new Date().toISOString() }]
    form.map(async (i) => {
        await fetch(baseURL + "current_values", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(i)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Se acutalizaron correctamente")
            })
            .catch((error) => {
                console.log(error);
            })
    })

}

//Peticion Put para actualizar los valores actuales
export const updateCurrentValue = async (name, value, date,  setThermometerState, setDoorState, setDataGraphState ) => {
    //Intercambio los valores para enviar el valor a cambiar
    const form = { name: name, currentValue: value ? (0) : (1), date: date };
    await fetch(baseURL + "current_values" , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
        .then((response) => response.json())
        .then((data) => {
            getCurrentValues(setDoorState, setThermometerState);
            if (name === "door") {
                getDoors(setDataGraphState);
            }
            if (name === "thermometer") {
                getThermometers(setDataGraphState);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//Peticion Get de las puertas
export const getDoors = async (setDataGraphState, setDataOriginal) => {
    await fetch(baseURL + "doors")
        .then((response) => response.json())
        .then((data) => {
            //Validar que el array no devuelva un array vacio, en caso de que lo haga se asigna un array con los valores inciales
            if (data.data.length <= 0) {
                setDataGraphState([{ id: 0, value: 0, date: "" }]);
            } else {
                setDataGraphState(data.data);
                setDataOriginal(data.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//Peticion Post de las puertas
export const postDoors = async (value, date) => {
    const form = { value: value ? (1) : (0), date: date };
    await fetch(baseURL + "doors", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
}

//Peticion Get de las puertas
export const getThermometers = async (setDataGraphState, setDataOriginal) => {
    await fetch(baseURL + "thermometer")
        .then((response) => response.json())
        .then((data) => {
            //Validar que el array no devuelva un array vacio, en caso de que lo haga se asigna un array con los valores inciales
            if (data.data.length <= 0) {
                setDataGraphState([{ id: 0, value: 0, date: "" }]);
            } else {
                setDataGraphState(data.data);
                setDataOriginal(data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//Peticion Post de las puertas
export const postThermometer = async (value, date) => {
    const form = { value: value ? (1) : (0), date: date };
    await fetch(baseURL + "thermometer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
}