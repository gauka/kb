import React from 'react'
import './VerticalReplaceCode.css'
import { getCryptoResult } from '../../../../math_logic/VerticalReplaceCode/vertical_replace_code_math'

class FormGroupBlock extends React.Component {
    state = {
        message: 'пример маршрутной перестановки',
        key: 'ДЯДИНА',
    }

    render() {
        return (<div className="vertical-replace-code">
            <form>
                <div className="form-group">
                    <label>Сообщение</label>
                    <textarea
                        className="form-control"
                        defaultValue={this.state.message}
                        onChange={(e) => { this.setState({ message: e.currentTarget.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label>Ключ</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.key}
                        onChange={(e) => { this.setState({ key: e.currentTarget.value }) }}
                    />
                </div>
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.key, this.state.message, e) }}>Зашифровать сообщение</button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ codeMessage, cryptoMatrix, symbolKey }) => (
    <div className="vertical-replace-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-xs-12">
                    {cryptoMatrix && cryptoMatrix.length > 0 &&
                        <div>
                            <h5>Шифрующая таблица</h5>
                            <table className="table">
                                <tbody>
                                    {symbolKey &&
                                        <tr className='main'>
                                            {Array.from(symbolKey).map((item, index) =>
                                                <td key={index}>{item}</td>
                                            )}
                                        </tr>
                                    }
                                    {cryptoMatrix.map((row, indexRow) =>
                                        <tr key={indexRow} className={indexRow === 0 ? 'main' : ''}>
                                            {row.map((item, index) =>
                                                <td key={index}>{item}</td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="col-md-7 col-xs-12" style={{ paddingLeft: '70px' }}>
                    {codeMessage &&
                        <div>
                            <h5>Зашифрованное сообщение</h5>
                            <p>{codeMessage}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>

)

class VerticalReplaceCode extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
        symbolKey: null,
    }

    calc = (key, message, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ cryptoMatrix: result.cryptoMatrix })
        this.setState({ symbolKey: result.symbolKey })
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
                        <ResultBlock codeMessage={this.state.codeMessage} cryptoMatrix={this.state.cryptoMatrix} symbolKey={this.state.symbolKey} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Широкое распространение получила разновидность маршрутной перестановки —
                            вертикальная перестановка. В этом шифре также используется прямоугольная
                            таблица, в которую сообщение записывается по строкам слева направо.
                            Выписывается шифрограмма по вертикалям, при этом столбцы выбираются в
                            порядке, определяемом ключом.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerticalReplaceCode
