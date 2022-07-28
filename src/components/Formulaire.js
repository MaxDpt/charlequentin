
import styled from "styled-components"; 
import * as React from 'react';
import { useEffect, useState, useRef }from "react";
import emailjs from '@emailjs/browser';
import DeleteLogo from "./Icons/DeleteLogo";

export default function Formulaire() {
    
    var [idPrestation, setIdprestation] = useState(localStorage.getItem('idPrestation'));
    const [isLoading, setIsLoading] = useState(true);
    const [prestation, setPrestation] = useState (null);
    const [prestationName, setPrestationName] = useState('');
    const [emailPerso,setEmailPerso] = useState('');

    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState('');

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [ville, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [object, setObject] = useState('');

    const formRef = useRef();


    // Load data prestation --------------------------
    if (idPrestation) {
        useEffect(() => {
            fetch('http://localhost:1337/api/prestations/'+idPrestation+'?populate=*',
            { method: 'GET',
                headers: {'Accept': 'Application/json'} })
        .then(res => res.json())
        .then(res => {
                var data = Array(res.data);
                var prestationName = Array(res.data.attributes.title);
                setPrestation(data);
                setPrestationName(prestationName); 
                if (prestationName) {
                    setObject(prestationName)
                };
                setIsLoading(false)
                }) }, [])
    }
    // -----------------------------------------------
    // Load data email -------------------------------
    useEffect(() => {
        fetch('http://localhost:1337/api/email',
        { method: 'GET',
            headers: {'Accept': 'Application/json'} })
    .then(res => res.json())
    .then(res => {
            var email = Array(res.data.attributes.email);   
            setEmailPerso(email);
            }) }, [])
    // -----------------------------------------------
    // Prestation link & delete ----------------------
    const link = () => {
        window.location.href='/Prestations';
    }
    const DeletePrestation = () => {
        localStorage.clear();
        window.location.reload();
    }
    // ----------------------------------------------
    // SUBMIT FORM -----------------------------------
    const handleForm = async (e) => {
        e.preventDefault()

        if (name !== '' & object !== '' & ville !== ''  & email !== '') {
              
            setError('')
            emailjs.sendForm('service_wxfo1z1', 'template_aizkfyt', 'form', 'DOBj7QKzN7GIKHnxR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    
            formRef.current.reset();
            setName('');
            setFirstName('');
            setCity('');
            setDate('');
            setEmail('');
            setObject('');
            setPrestationName('')
            setConfirm('CONFIRMATION : Votre fortmulaire a bien été transmit. Un email de confirmation vous à également été envoyé. ')
            setTimeout(() => {
                setConfirm('')
              }, 4000)

            } else {
                console.log('Champs incomplet')
                setError('ATTENTION : tous les champs requis ne sont pas remplis.')
            }
    };

    // -----------------------------------------------

        return (
        <Wrapper>

            <h2 className="title">Contact</h2>

            {error ?(
                <div className="errorMessage">
                    <p>{error}</p>
                </div> ) : null}

            {confirm ?(
            <div className="confirmMessage">
                <p>{confirm}</p>
            </div> ) : null}

            <form className="form" method="POST" ref={formRef} onSubmit={handleForm} id='form'> 

                <div className="containerA">
                    <div className="containerB">
                    <p className="titleText">Transmetez-nous vôtre choix par se formulaire.</p>
                        <div className="row">
                                <label className="label">Nom* :</label>
                                <input className={`nom ${name === '' & error !== '' ? 'vide' : 'nom' }`} type='text' name="nom" placeholder='Nom' onChange={input => setName(input.target.value)} />
                            </div>
                            <div className="row">
                                <label className="label">Prenom :</label>
                                <input className="prenom" type='text' name="prenom" placeholder='Prenom' onChange={input => setFirstName(input.target.value)} />
                            </div>
                            <div className="row">
                                <label className="label">Ville* :</label>
                                <input className={`ville ${ville === '' & error !== '' ? 'vide' : 'ville' }`} type='text' name="ville" placeholder='ville' onChange={input => setCity(input.target.value)} />
                            </div>
                            <div className="row">
                                <label className="label">Date souhaité :</label>
                                <input className="date" type='date' name="date" onChange={input => setDate(input.target.value)} />
                            </div>
                </div>
                    </div>


                <div className="container0">
                    <div className="container1">

                        <div className="EmailObject">
                        <div className="row1">
                            <input className="email" type='email' name="emailPerso" value={emailPerso} />
                        </div>
                        <div className="row">
                            <label className="label">Email* :</label>
                            <input className={`email ${ email === '' & error !== '' ? 'vide' : 'email' }`} type='email' name="email" placeholder='email@exemple.com' onChange={input => setEmail(input.target.value)} />
                        </div>
                        <div className="row">
                            <label className="label">Object* :</label>
                            <input className={`object ${ object === '' & error !== '' ? 'vide' : 'object' }`} type='text' name="object" placeholder='' defaultValue={object} onChange={input => setObject(input.target.value)} />
                        </div>
                        </div>
                        <p className="error"> Les champs portant le sympole *, sont obligatoire.</p>
                    </div>

                    <div className="container2">
                        <div className="Prestation">
                        {!prestation ? (<div>
                            <a className="link" onClick={link}><h1> Cliquer ici</h1> <p>pour choisir une préstation.</p><br/>
                            <p>Afin de préciser le service souhaité.</p>
                            <p>Ce choix n'est en aucun cas définitif.</p></a>
                        </div>) 
                        : prestation.map(presta => (
                        <div>
                            <p className="line"> Préstation :  {presta.attributes.title} </p>
                            <p className="line"> Au prix : {presta.attributes.prix} euro/TTC</p>
                            <a className="Delete" onClick={DeletePrestation}><DeleteLogo/></a>
                            <img className="image" src={'http://localhost:1337'+presta.attributes.image.data.attributes.url}/>
                
                            
                        </div>
                        ) )}                       
                        </div>
                    </div>

                </div>
                <div className="containerX">
                    <div className="containerY">
                        <textarea className="text-area" type='text'  name="message" placeholder='Ecrivez ici' onChange={input => setMessage(input.target.value)} />
                    </div>
                    <div className="containerZ">
                        <button className="Send" type="submit" ><p>Envoyer</p></button>
                    </div>
                </div>
                

            </form>
        </Wrapper>
        );
    };
    
    const Wrapper = styled.div`
    display: flex; 
    justify-content: center;
    flex-direction: column;
    margin: auto;
    width: 60rem;


    .containerA {
        background-color: #02111f;
        border: 2px solid white;
        border-radius: 10px;
        display: flex;
        flex-direction: column; 
        margin: auto;
        width: 100%;
    }
    .containerB {
        display: flex;
        flex-direction: column; 
        width: 65%;
        margin: auto;
        
    }

    .titleText {
        margin: 1rem auto;
        font-size: 1.2rem;;
    }

    .container0 {
        border: 2px solid white;
        border-radius: 10px;
        display: flex; 
        justify-content: center;
        flex-direction: row;
        width: 100%;
        height: 12rem;
        overflow: hidden;
        margin: 0.5rem auto;
    }
    .container1 {
        background-color: #02111f;
        display: flex;
        flex-direction: column; 
        width: 60%;
        
    }
    .container2 {
        background-color: #02111f;
        overflow: hidden;
        display: flex; 
        width: 40%;

    }

    .containerX {
        background-color: #02111f;
        border: 2px solid white;
        border-radius: 10px;
        display: flex;
        flex-direction: row; 
        width: 100%;
        overflow: hidden;
    }
    .containerY {
        display: flex;
        width: 80%;
    }
    .containerZ {
        display: flex;
        width: 20%;
    }
    .Prestation {
        display: flex;
        font-size: 1.2rem;
        margin: auto; 
        width: 80%;
    }
    
    .Prestation a {
        display: flex;
        flex-direction: column;
    }
    .Prestation a:hover {
        cursor: pointer;
    }
    .Delete {
        display: flex; 
        position: relative;
        bottom: 4.5rem;
        left: 19rem;
        z-index: 3;
        
    }
    .line {
        background-color: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        width: 30rem;
        height: 2rem;
        margin-left: -7rem;
        padding-left: 1rem;
        padding-top: 1rem;
        position: relative;
        font-size : 1.4rem;
        z-index: 2;
    }
    .link {
        border: dashed 2px white;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        margin-left: 3rem;
    }
    .image {
        display: flex;
        position: relative;
        margin-top: -8rem;
        margin-left: -5rem;
        width: 30rem;
        z-index: 0;
    }
    .title {
        margin: 2rem auto;
        font-size: 58px;
    }

    .form {
        display: flex; 
        flex-direction: column;
        width: 100%;
    }
    .EmailObject {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: auto;
    }
    .row {
        display: flex; 
        width: 100%;
        flex-direction: row;
        padding-bottom: 1rem;
    }
    .row1 {
        display: flex; 
        position: absolute;
        visibility: hidden;
    }
    .label {
        display: flex; 
        margin: auto 0.5rem;
        width: 20%;
        font-size: 20px;
    }
    .email, .object {
        background-color: white;
        border: 2px solid white;
        font-size: 16px;
        width: 75%;
        border-radius: 0.4rem;
        height: 1.5rem;
        padding-left: 0.5rem;
    }
    .nom, .prenom, .date, .ville {
        background-color: white;
        border: 2px solid white;
        font-size: 16px;
        width: 75%;
        border-radius: 0.4rem;
        height: 1.5rem;
        padding-left: 0.5rem;
    }
    .date {
        width: 25%;
    }
    .error {
        margin-bottom: 1rem;
        text-align: center;
    }
    .errorMessage {
        background-color: #d07b8c;
        border-radius: 10px;
        box-shadow: 0px 2px 10px 2px #02111f;
        margin: 1rem auto;
        padding: 1rem 0.5rem;;
        width: auto;
        text-align: center;
    }
    .confirmMessage {
        background-color: #7bd0a1;
        border-radius: 10px;
        box-shadow: 0px 2px 10px 2px #02111f;
        margin: 1rem auto;
        padding: 1rem 0.5rem;;
        width: auto;
        text-align: center;  
    }
    .vide {
        border: solid red 2px;
        box-shadow: 0px 2px 10px 2px #d07b8c;
    }
    .text-area {
        background-color: white;
        border: 2px solid white;
        font-size: 16px;
        width: 100%;
        padding-bottom: 7rem;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
    }
    .Send {
        display: flex;
        color: white;
        height: 10rem; 
        width: 12rem; 
        background-color: #02111f;
        margin: auto;
        border: none;
    }
    .Send p {
        margin: auto;
        font-size: 28px;
    }
    .Send:hover {
        cursor: pointer;
        background-color:#323d44;
    }
    `;

