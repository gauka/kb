import React from 'react'
import './TrisCode.css'
import { getCryptoResult } from '../../../../math_logic/TrisCode/tris_code_math'

class FormGroupBlock extends React.Component {
    state = {
        message: 'СЕГОДНЯ В ЯРОСЛАВЛЕ ПАСМУРНО',
        key: 'ДЯДИНА',
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

const ResultBlock = ({ codeMessage, cryptoMatrix }) => (
    <div className="tris-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-xs-12">
                    {cryptoMatrix && cryptoMatrix.length > 0 &&
                        <div>
                            <h5>Шифрующая таблица</h5>
                            <table>
                                <tbody>
                                    {cryptoMatrix.map((row, indexRow) =>
                                        <tr key={indexRow}>
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
                <div className="col-md-7 col-xs-12">
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

class TrisCode extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
    }

    calc = (key, message, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ cryptoMatrix: result.cryptoMatrix })
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
                        <ResultBlock codeMessage={this.state.codeMessage} cryptoMatrix={this.state.cryptoMatrix} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Шифр Тритемиуса(Трисемуса) — система шифрования, разработанная Иоганном Тритемием.
                            Представляет собой усовершенствованный шифр Цезаря, то есть шифр подстановки.
                            По алгоритму шифрования, каждый символ сообщения смещается на символ, отстающий
                            от данного на некоторый шаг. Здесь шаг смещения делается переменным, то есть
                            зависящим от каких-либо дополнительных факторов. Например, можно задать закон
                            смещения в виде линейной функции (уравнения зашифрования) позиции шифруемой буквы.
                            Сама функция должна гарантировать целочисленное значение. Прямая функция шифрования
                            должна иметь обратную функцию шифрования, тоже целочисленную.
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrisCode
