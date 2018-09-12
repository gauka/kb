import React from 'react'
import './Ticket.css'
import Description from '../Description/Description'

const Ticket = ({ content, updateMainBlock }) => {
    const {
        title,
    } = content
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{title}</h3>
                    </div>
                </div>
            </div>
            <Description content={content} updateMainBlock={updateMainBlock} />
        </div>
    )
}

export default Ticket;