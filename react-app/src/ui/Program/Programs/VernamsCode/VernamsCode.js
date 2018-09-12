import React from 'react'
import './VernamsCode.css'
import { getCryptoResult } from '../../../../math_logic/VernamsCode/vernams_code_math'
import { copyText } from '../../../../ui/utils/textUI'

class FormGroupBlock extends React.Component {
    state = {
        message: 'АБУНАГИМОВ',
        isCoding: true,
        key: '',
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
                        <label>Гамма</label>
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
                <br />
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.message, this.state.isCoding, this.state.key, e) }}>
                    {this.state.isCoding ? 'Зашифровать сообщение' : 'Расшифровать сообщение'}
                </button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ codeMessage, isCoding, copyMessage, randomKey }) => (
    <div className="tris-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-xs-12">
                </div>
                <div className="col-md-5 col-xs-12">
                    {codeMessage && randomKey &&
                        <div className="code-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12" >
                                        <h6>{isCoding ? 'Зашифрованное сообщение:' : 'Расшифрованное сообщение:'}</h6>
                                        <p>
                                            {codeMessage}
                                            <i
                                                className="fa fa-clone copy-message"
                                                onClick={() => copyText(codeMessage)}
                                                data-toggle="tooltip"
                                                data-html="true"
                                                title="Копировать"
                                            ></i>
                                        </p>
                                        <h6>Гамма</h6>
                                        <p>
                                            {randomKey.join('')}
                                            <i
                                                className="fa fa-clone copy-message"
                                                onClick={() => copyText(randomKey.join(''))}
                                                data-toggle="tooltip"
                                                data-html="true"
                                                title="Копировать"
                                            ></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
)

class VernamsCode extends React.Component {
    state = {
        codeMessage: '',
        isCoding: null,
        key: [],
    }

    calc = (message, _isCoding, key, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, _isCoding, key)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ isCoding: _isCoding })
        this.setState({ key: result.key })
    }

    copyMessage = (message) => {

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
                            isCoding={this.state.isCoding}
                            copyMessage={this.copyMessage}
                            randomKey={this.state.key}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Шифр является разновидностью криптосистемы одноразовых блокнотов.
                            В нём используется булева функция «Исключающее ИЛИ».
                            Шифр Вернама является примером системы с абсолютной
                            криптографической стойкостью. При этом он считается одной
                            из простейших криптосистем.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default VernamsCode
