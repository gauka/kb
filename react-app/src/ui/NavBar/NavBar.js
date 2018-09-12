import React from 'react'
import './NavBar.css'

const NavBarBrand = ({ title, icon }) => {
    return (
        <a className="navbar-brand" href="">
            <span><i className="fa fa-user-secret fa-fw" aria-hidden="true"></i>&nbsp;{title}</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className={icon}></span>
            </button>
        </a>
    )
}

const NavItem = ({ title, icon, dropdownItems, updateMainBlock }) => {
    return (
        <li className={`nav-item ${dropdownItems ? 'dropdown' : ''}`}>
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <span><i className={icon} aria-hidden="true"></i>&nbsp;{title}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {dropdownItems && dropdownItems.map((item, index) =>
                    <a
                        className={`dropdown-item ${item.className}`}
                        key={index}
                        onClick={() => { updateMainBlock(item.routeToComp) }}
                    >
                        {item.label}
                    </a>
                )}
            </div>
        </li>
    )
}

const NavBar = ({ updateMainBlock }) => {
    const brandTitle = 'Информационная безопасность'
    const brandIcon = 'navbar-toggler-icon'
    const navItems = [
        {
            title: 'Задания',
            icon: 'fa fa-asterisk fa-fw',
            // dropdownItems: [
            //     { 
            //         label: 'Шифрующая система Трисемуса', 
            //         routeToComp: { 
            //             type: 'Ticket', 
            //             comp: 'TrisCode',
            //             title: 'Шифрующая система Трисемуса', 
            //     } 
            // },
            // ]
        },
        {
            title: 'Программы',
            icon: 'fa fa-rocket fa-fw',
            dropdownItems: [
                { label: 'Шифрующая система Трисемуса', routeToComp: { type: 'Program', comp: 'TrisCode', title: 'Шифрующая система Трисемуса', } },
                { label: 'Шифр Виженера', routeToComp: { type: 'Program', comp: 'VizhCode', title: 'Шифр Виженера', } },
                { label: 'Шифр вертикальной перестановки', routeToComp: { type: 'Program', comp: 'VerticalReplaceCode', title: 'Шифр вертикальной перестановки', } },
                { label: 'Шифр табличной маршрутной перестановки', routeToComp: { type: 'Program', comp: 'TableRouteReplaceCode', title: 'Шифр табличной маршрутной перестановки', } },
                { label: 'Шифр модульного гаммирования', routeToComp: { type: 'Program', comp: 'ModularGammaEncoding', title: 'Шифр модульного гаммирования', } },
                { label: 'Шифр Вернама', routeToComp: { type: 'Program', comp: 'VernamsCode', title: 'Шифр Вернама', } },
                { label: 'Шифр ADFGVX', routeToComp: { type: 'Program', comp: 'CodeADFGVX', title: 'Шифр ADFGVX', } },
                { label: 'DES-ECB алгоритм', routeToComp: { type: 'Program', comp: 'CodeDES-ECB', title: 'DES-ECB алгоритм', } },
                { label: 'НОД по Евклиду', routeToComp: { type: 'Program', comp: 'EuclidGcd', title: 'НОД по Евклиду', } },
                { label: 'Алгоритм RSA', routeToComp: { type: 'Program', comp: 'CodeRSA', title: 'Алгоритм RSA', } },
                { label: 'Алгоритм Эль-Гамаля', routeToComp: { type: 'Program', comp: 'CodeElGamal', title: 'Алгоритм Эль-Гамаля', } },    
            ]
        },
        {
            title: 'Исходный код',
            icon: 'fa fa-code fa-fw',
            // dropdownItems: [
            //     { label: 'Шифрующая система Трисемуса', routeToComp: { type: 'SourceCode', comp: 'TrisCode', title: 'Шифрующая система Трисемуса', } },
            // ]
        },
    ]
    return (
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
            <NavBarBrand title={brandTitle} icon={brandIcon} />
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {navItems.map((item, index) =>
                        <NavItem key={index} {...item} updateMainBlock={updateMainBlock} />
                    )}
                </ul>
            </div>
        </nav>
    )
}

export {
    NavBar as default
}