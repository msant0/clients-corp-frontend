import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'
import logoCardiology from '../../assets/cardiology.png'
import constants from '../../helpers/constants.js'
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiUsers } from 'react-icons/fi'
import './styles.css'
import '../../App.css'

export default function Client() {
    const [clients, setClients] = useState([])
    const history = useHistory()

    useEffect(function () {
        api.get('/clients').then(function (res) {
            setClients(res.data)
        })
    })

    async function handleDeleteClient(CPF) {
        try {
            await api.delete(`deleteClient/${CPF}`)
            setClients(clients.filter(client => client.CPF !== CPF))
        } catch (err) {
            alert(constants.ERROR_MESSAGE_WHEN_DELETING_CLIENT)
        }
    }

    function handleUpdateClient(client) {
        sessionStorage.setItem('client-cpf', client.CPF)
        sessionStorage.setItem('client-name', client.name)
        sessionStorage.setItem('client-email', client.email)
        sessionStorage.setItem('client-telephone', client.telephone)

        history.push('/editClient')
    }

    return (
        <div className='client-container'>
            <header>
                <img src={logoCardiology} alt='Cardiology Logo' />
                <span>{constants.COMPANY_LOGO}</span>

                <Link className='button' to='/createClient'>{constants.REGISTER_NEW_CUSTOMER}</Link>
            </header>
            <div className='client-subcontainer'>
                <h1>Clients Dashboard</h1>
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            <strong>CPF:</strong>
                            <p>{client.CPF}</p>
                            <strong>Name:</strong>
                            <p>{client.name}</p>
                            <strong>E-mail:</strong>
                            <p>{client.email}</p>
                            <strong>Telephone:</strong>
                            <p>{client.telephone}</p>
                            <button type='button' className='button-users' onClick={() => handleUpdateClient(client)}>
                                <FiUsers size={20} color="#FFFF" />
                            </button>
                            <button type='button' className='button-trash' onClick={() => { handleDeleteClient(client.CPF) }}>
                                <FiTrash2 size={20} color="#FFFF" />
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}