import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logoCardiology from '../../assets/cardiology.png'
import constants from '../../helpers/constants.js'
import validarCPF from 'validar-cpf'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import api from '../../services/api.js'
import './styles.css'

export default function NewClient() {
    const [CPF, setCPF] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
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

    function handleNewClient(e) {
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
        }).then((result) => {
            if (result.value === true) {
                handleClient()
                async function handleClient() {
                    try {
                        await api.post('/createClient', data)
                        Swal.fire({
                            title: constants.REGISTRATION_MESSAGE_PERFORMED,
                            icon: 'success'
                        })
                        history.push('/')
                    } catch (err) {
                        Swal.fire({
                            title: constants.ERROR_MESSAGE_WHEN_REGISTERING_CLIENT,
                            icon: 'error'
                        })
                    }
                }
            }
        })
    }

    return (
        <div className='new-client-container'>
            <div className='new-client-subcontainer'>
                <section>
                    <img src={logoCardiology} alt={constants.ALT_CARDIOLOGY_LOGO} />
                </section>
                <div className='new-client-subcontainer-form'>
                    <form onSubmit={handleNewClient}>
                        <p>{constants.TITLE_FOR_DATA_INFORMATION}</p>
                        <input placeholder='CPF' value={CPF} onChange={e => setCPF(e.target.value)} />
                        <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                        <input type='email' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} required/>
                        <InputMask type='tel' mask="(99) 999999999" maskChar={null} placeholder='Telephone' value={telephone} onChange={e => setTelephone(e.target.value)} />
                        <button className='button' type='submit'>{constants.REGISTER_NEW_CUSTOMER}</button>
                        <Link to='/'><button className='button'>{constants.BUTTON_TO_RETURN_DASHBOARD}</button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}