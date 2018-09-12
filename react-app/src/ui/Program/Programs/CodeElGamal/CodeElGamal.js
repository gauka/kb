import React from 'react'
import './CodeElGamal.css'
import { getCryptoResult } from '../../../../math_logic/CodeElGamal/el_gamal_code_math'
import { copyText } from '../../../../ui/utils/textUI'

class FormGroupBlock extends React.Component {
    state = {
        message: 'АБУНАГИМОВ',
        key: '',
        isCoding: true,
    }

    render() {
        return (<div className="tris-code">
            <form>
                <div className="form-group">
                    <label>Сообщение</label>
                    <textarea
                        className="form-control"
                        defaultValue={this.state.message}
                        onChange={(e) => { this.setState({ message: e.currentTarget.value }) }}
                    />
                </div>
                {!this.state.isCoding &&
                    <div className="form-group">
                        <label>Ключ</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.key}
                            onChange={(e) => { this.setState({ key: e.currentTarget.value }) }}
                        />
                    </div>
                }
                <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        className="custom-control-input"
                        id="defaultGroupExample1"
                        name="groupOfDefaultRadios"
                        defaultChecked={this.state.isCoding}
                        onClick={() => { this.setState({ isCoding: true }) }}
                    />
                    <label className="custom-control-label" htmlFor="defaultGroupExample1">Зашифровать сообщение</label>
                </div>
                <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        className="custom-control-input"
                        id="defaultGroupExample2"
                        name="groupOfDefaultRadios"
                        defaultChecked={!this.state.isCoding}
                        onClick={() => { this.setState({ isCoding: false }) }}
                    />
                    <label className="custom-control-label" htmlFor="defaultGroupExample2">Расшифровать сообщение</label>
                </div>
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.key, this.state.message, this.state.isCoding, e) }}>
                    {this.state.isCoding ? 'Зашифровать сообщение' : 'Расшифровать сообщение'}
                </button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ codeMessage, isCoding, publicKey, privateKey }) => (
    <div className="tris-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-xs-12">
                </div>
                <div className="col-md-10 col-xs-12">
                    {codeMessage &&
                        <div>
                            <p>
                                <span style={{ fontWeight: 'bold' }}>
                                    {isCoding ? 'Зашифрованное сообщение: ' : 'Расшифрованное сообщение: '}
                                </span>
                                {codeMessage}
                                <i
                                    className="fa fa-clone copy-message"
                                    onClick={() => copyText(codeMessage)}
                                    data-toggle="tooltip"
                                    data-html="true"
                                    title="Копировать"
                                ></i>
                            </p>
                            {publicKey && isCoding && <p><span style={{ fontWeight: 'bold' }}>Публичный ключ: </span>{publicKey}</p>}
                            {privateKey && isCoding &&
                                <p>
                                    <span style={{ fontWeight: 'bold' }}>Приватный ключ: </span>
                                    {privateKey}
                                    <i
                                        className="fa fa-clone copy-message"
                                        onClick={() => copyText(privateKey)}
                                        data-toggle="tooltip"
                                        data-html="true"
                                        title="Копировать"
                                    ></i>
                                </p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>

)

class CodeElGamal extends React.Component {
    state = {
        codeMessage: '',
        isCoding: null,
        publicKey: null,
        privateKey: null,
    }

    calc = (key, message, _isCoding, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key, _isCoding)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ privateKey: result.privateKey })
        this.setState({ publicKey: result.publicKey })
        this.setState({ isCoding: _isCoding })
    }

    render() {

        const {
            title,
        } = this.props.content

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        <FormGroupBlock calc={this.calc} />
                    </div>
                    <div className="col-md-9 col-xs-12 result">
                        <ResultBlock
                            codeMessage={this.state.codeMessage}
                            cryptoMatrix={this.state.cryptoMatrix}
                            isCoding={this.state.isCoding}
                            publicKey={this.state.publicKey}
                            privateKey={this.state.privateKey}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Схема Эль-Гамаля (Elgamal) — криптосистема с открытым ключом, основанная
                            на трудности вычисления дискретных логарифмов в конечном поле. Криптосистема
                            включает в себя алгоритм шифрования и алгоритм цифровой подписи. Схема Эль-Гамаля
                            лежит в основе бывших стандартов электронной цифровой подписи в США (DSA) и
                            России (ГОСТ Р 34.10-94).
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeElGamal
