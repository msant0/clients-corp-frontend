import React, { useState } from 'react'
import { Link,  useHistory } from 'react-router-dom'
import validarCPF from 'validar-cpf'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import logoCardiology from '../../assets/cardiology.png'
import constants from '../../helpers/constants.js'
import api from '../../services/api.js'
import './styles.css'

export default function EditClient() {
    const [CPF, setCPF] = useState(sessionStorage.getItem('client-cpf'))
    const [name, setName] = useState(sessionStorage.getItem('client-name'))
    const [email, setEmail] = useState(sessionStorage.getItem('client-email'))
    const [telephone, setTelephone] = useState(sessionStorage.getItem('client-telephone'))
    const history = useHistory()
    let errorsValidation = false

    function validateCPF() {
        if (CPF === '') {
            Swal.fire({
                title: constants.EMPTY_CPF_FIELD,
                icon: 'error'
            })
            errorsValidation = true
        } else if (validarCPF(CPF) === false) {
            Swal.fire({
                title: constants.INVALID_CPF_VALIDATION,
                icon: 'error'
            })
            errorsValidation = true
        }
    }

    function validateName() {
        if (name === '') {
            Swal.fire({
                title: constants.EMPTY_NAME_FIELD,
                icon: 'error'
            })
            errorsValidation = true
        }
    }

    function validateEmail() {
        if (email === '') {
            Swal.fire({
                title: constants.EMPTY_EMAIL_FIELD,
                icon: 'error'
            })
            errorsValidation = true
        }
    }

    function validateTelephone() {
        if (telephone === '') {
            Swal.fire({
                title: constants.EMPTY_TELEPHONE_FIELD,
                icon: 'error'
            })
            errorsValidation = true
        }

        if(telephone.replace(/\(/g, '').replace(/\)/g, '').replace(' ', '').length < 11){
            Swal.fire({
                title: constants.INVALID_TELEPHONE_VALIDATION,
                icon: 'error'
            })
            errorsValidation = true
        }
    }


    function handleEditClient(e) {
        e.preventDefault()

        validateCPF()
        if (errorsValidation !== false) return
        validateName()
        if (errorsValidation !== false) return
        validateEmail()
        if (errorsValidation !== false) return
        validateTelephone()
        if (errorsValidation !== false) return

        const data = {
            CPF,
            name,
            email,
            telephone
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Click yes to continue with the registration',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#008080',
            confirmButtonText: 'Yes'
        }).then((result)=>{
            if(result.value ===true){
                handleClient()
                async function handleClient(){
                    try {
                        await api.put(`/updateClient/${CPF}`, data)
                        Swal.fire({
                            title: constants.CHANGED_MESSAGE_PERFORMED,
                            icon: 'success'
                        })
                        history.push('/')
                    } catch(err) {
                        Swal.fire({
                            title: constants.ERROR_MESSAGE_WHEN_CHANGED_CLIENT,
                            icon: 'error'
                        })
                    }
                }
            }
        })

    }
    return (
        <div className='edit-client-container'>
            <div className='edit-client-subcontainer'>
                <section>
                    <img src={logoCardiology} alt={constants.ALT_CARDIOLOGY_LOGO} />
                </section>
                <div className='edit-client-subcontainer-form'>
                    <form onSubmit={handleEditClient}>
                        <p>{constants.TITLE_FOR_DATA_INFORMATION}</p>
                        <input placeholder='CPF' value={CPF} onChange={e => setCPF(e.target.value)} />
                        <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                        <input type='email' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
                        <InputMask type='tel' mask="(99) 999999999" placeholder='Telephone' value={telephone} onChange={e => setTelephone(e.target.value)} />
                        <button className='button' type='submit'>{constants.BUTTON_EDIT_CLIENT}</button>
                        <Link to='/'><button className='button'>{constants.BUTTON_TO_RETURN_DASHBOARD}</button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}