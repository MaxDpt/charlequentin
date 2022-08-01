
    import styled from "styled-components"; 
    import React from "react";
    

    const Card = ({
        id = '',
        title = '',
        description = '',
        prix = '',
        image ='',
    }) => {
    
        const PrestationClicked = () => {
            window.location.href='/Contact';
            localStorage.setItem('idPrestation', id)
        }
    return (
    <Wrapper>
        
            
        <div className="container" onClick={PrestationClicked}>
            <div className="card">
                <div className="row1"><h2 className="titre">{title}</h2></div>
                <div className="row2"><p className="description">{description}</p></div>
                <div className="row3"><p className="prix">{prix} euro</p></div>
                <div className="row4"> <p>Choisir</p></div>
            </div>
            
            <div className="image">
                <img className="image" src={'http://localhost:1337'+image.data.attributes.url} />
            </div>
        </div>
        
    </Wrapper>
    );
    };
    
    const Wrapper = styled.div`

    .container {
        box-shadow: 0px 2px 12px 2px #02111f;
        border-radius: 2px;
        display: flex;
        width: 20rem; 
        height: 30rem;
        overflow: hidden; 
        flex-direction: column; }

    .container:hover {
        cursor: pointer;
        box-shadow: 0px 2px 4px 2px #02111f;
    }
    .card { 
        z-index: 1;}

    .row1, .row2, .row3, .row4 {
        display: flex; 
        width: 100%; 
        justify-content: center;}

    .row1 {
        position: relative;
        margin-top: -1rem;
        height: 4rem;
        font-size: 4rem;}

    .row2 {
        height: 16rem;
        font-size: 1.6rem;}

    .row3 {
        height: 4rem;
        font-size: 2.2rem;}

    
    .row4 {
        background-color: rgba(0,0,0,0.4);
        margin-top: 2rem;
        padding-top: 0.5rem;
        margin-left: -1.5rem;
        width: 120%;
        height: 4rem;
        font-size: 2.2rem;}

    
    .description {
        margin-top: 6rem;
        height: 20rem;}

    .prix {
        margin-top: 2.5rem;
        margin-bottom: 1rem;}

    .image {
        opacity: 65%;
        width: 70rem;
        position: relative;
        top: -22rem;
        left: -8rem;}

@media screen and (max-width: 450px) { 
    .container {
        width: 10rem; 
        height: 18rem;
 }
 .row1 {
        position: relative;
        margin-top: 0rem;
        height: 2rem;
        font-size: 1.6rem;}

    .row2 {
        height: 2rem;
        font-size: 0.9rem;}

    .row3 {
        height: 1rem;
        font-size: 1.2rem;}

    
    .row4 {
        background-color: rgba(0,0,0,0.4);
        margin-top: 10rem;
        padding-top: 0.5rem;
        margin-left: -1.5rem;
        width: 150%;
        height: 2rem;
        font-size: 1.2rem;}

    
    .description {
        margin-top: 2rem;
        height: 10rem;}

    .prix {
        margin-top: 9.5rem;
        margin-bottom: 1rem;}

    .image {
        opacity: 65%;
        width: 30rem;
        position: relative;
        top: -9.5rem;
        left: -4.5rem;}
}
@media screen and (max-width: 850px) {
        @media screen and (max-height: 450px) { 
            .container {
        width: 12rem; 
        height: 18rem;
 }
 .row1 {
        position: relative;
        margin-top: 0rem;
        height: 2rem;
        font-size: 1.6rem;}

    .row2 {
        height: 2rem;
        font-size: 0.9rem;}

    .row3 {
        height: 1rem;
        font-size: 1.2rem;}

    
    .row4 {
        background-color: rgba(0,0,0,0.4);
        margin-top: 10rem;
        padding-top: 0.5rem;
        margin-left: -1.5rem;
        width: 150%;
        height: 2rem;
        font-size: 1.2rem;}

    
    .description {
        margin-top: 2rem;
        height: 10rem;}

    .prix {
        margin-top: 9.5rem;
        margin-bottom: 1rem;}

    .image {
        opacity: 65%;
        width: 30rem;
        position: relative;
        top: -9.5rem;
        left: -4.5rem;}
}  
        }}
    `;
    export default Card;
