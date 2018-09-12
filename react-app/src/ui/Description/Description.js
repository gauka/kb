import React from 'react'
import './Description.css'

const Description = ({ content, updateMainBlock }) => {
    const {
        comp,
        type,
    } = content

    return (
        <div className="container description">
            <span>
                {type !== 'Ticket' &&
                    <a    
                        className="btn btn-outline-info btn-sm"
                        onClick={() => { updateMainBlock({comp: content.comp, type:'Ticket', title: content.title}) }}
                    >
                        <i className="fa fa-asterisk fa-fw" aria-hidden="true"></i>
                        Задание
                    </a>
                }
                {type !== 'Program' &&
                    <a  
                        className="btn btn-outline-info btn-sm"
                        onClick={() => { updateMainBlock({comp: content.comp, type:'Program', title: content.title}) }}
                    >
                        <i className="fa fa-rocket fa-fw" aria-hidden="true"></i>
                        Программа
                    </a>
                }
                {type !== 'SourceCode' &&
                    <a 
                        className="btn btn-outline-info btn-sm"
                        onClick={() => { updateMainBlock({comp: content.comp, type:'SourceCode', title: content.title}) }}
                    >
                        <i className="fa fa-code fa-fw" aria-hidden="true"></i>
                        Исходный код программы
                    </a>
                }
            </span>
        </div>
    )
}

export default Description;