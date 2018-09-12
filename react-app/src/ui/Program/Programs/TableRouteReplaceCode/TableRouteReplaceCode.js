import React from 'react'
import './TableRouteReplaceCode.css'
import { getCryptoResult } from '../../../../math_logic/TableRouteReplaceCode/table_route_replace_code_math'

class FormGroupBlock extends React.Component {
    state = {
        message: 'пример маршрутной перестановки',
        key: 'ДЯДИНА',
        routeIndex: null,
        matrixSize: 5,
    }

    render() {
        return (
            <div className="vertical-replace-code">
                <form >
                    <label>Сообщение</label>
                    <textarea
                        className="form-control"
                        defaultValue={this.state.message}
                        onChange={(e) => { this.setState({ message: e.currentTarget.value }) }}
                    />
                    <label style={{ marginTop: '15px' }}>Число колонок</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.matrixSize}
                        onChange={(e) => { this.setState({ matrixSize: e.currentTarget.value }) }}
                    />
                    <select
                        className="md-form form-control"
                        onChange={(e) => { this.setState({ routeIndex: e.currentTarget.value }) }}
                    >
                        <option value={null} disabled selected>Выберете маршрут</option>
                        <option value={1}>По вертикали, начинаю с верхнего правого угла</option>
                        <option value={2}>По вертикали, начинаю с верхнего левого угла</option>
                        <option value={3}>По горизонтали, начинаю с верхнего правого угла</option>
                        <option value={4}>По горизонтали, начинаю с верхнего левого угла</option>
                    </select>
                    <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.routeIndex, this.state.message, this.state.matrixSize, e) }}>Зашифровать сообщение</button>
                </form>
            </div>)
    }
}

const ResultBlock = ({ codeMessage, cryptoMatrix }) => (
    <div className="vertical-replace-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-xs-12">
                    {cryptoMatrix && cryptoMatrix.length > 0 &&
                        <div>
                            <h5>Шифрующая таблица</h5>
                            <div className="table-responsive">
                                <table className="table">
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

class TableRouteReplaceCode extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
    }

    calc = (routeIndex, message, matrixSize, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, routeIndex, matrixSize)
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
                            Наибольшее распространение получили маршрутные шифры перестановки,
                            основанные на прямоугольниках (таблицах). Например, можно записать
                            сообщение в прямоугольную таблицу по маршруту: по горизонтали,
                            начиная с верхнего левого угла, поочередно слева направо. Сообщение
                            будем списывать по маршруту: по вертикалям, начиная с верхнего
                            правого угла, поочередно сверху вниз.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableRouteReplaceCode

