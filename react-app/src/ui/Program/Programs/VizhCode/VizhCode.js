import React from 'react'
import './VizhCode.css'
import { getCryptoResult } from '../../../../math_logic/VizhCode/vizh_code_math'

class FormGroupBlock extends React.Component {
    state = {
        message: 'АБУНАГИМОВ',
        key: 'ДЯДИНА',
        offset: 0,
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
                <div className="form-group">
                    <label>Сдвиг квадрата Виженера</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.offset}
                        onChange={(e) => { this.setState({ offset: e.currentTarget.value }) }}
                    />
                </div>
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.key, this.state.message, this.state.offset, e) }}>Зашифровать сообщение</button>
            </form>
        </div>)
    }
}

class TableViewBlockModal extends React.Component {
    state = {
        focusedRowsIndex: null,
        focusedColumnsIndex: null,
    }

    render() {
        const { cryptoMatrix, message, formattedKey, codeMessage } = this.props
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Шифрующая таблица</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <tbody className="vish-table-modal">
                                    {cryptoMatrix.map((row, indexRow) =>
                                        <tr
                                            key={indexRow}
                                            ix={indexRow}
                                            className={`${indexRow === this.state.focusedRowsIndex ? 'hovered_element' : ''}`}
                                        >
                                            {row.map((item, index) => {
                                                return (
                                                    <td
                                                        key={index}
                                                        iy={index}
                                                        ix={indexRow}
                                                        className={`
                                                        ${index === 0 || indexRow === 0 ? 'main' : ''}
                                                        ${(index === this.state.focusedColsIndex) ? 'hovered_element' : ''}
                                                        `}
                                                        onMouseMove={(e) =>
                                                            this.setState({
                                                                focusedRowsIndex: Number(e.target.getAttribute('ix')),
                                                                focusedColsIndex: Number(e.target.getAttribute('iy')),
                                                            })

                                                        }
                                                    >
                                                        {item}
                                                    </td>
                                                )
                                            }
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            {message && <p><strong>Сообщение:</strong> {message}</p>}
                            {formattedKey && <p><span style={{ fontWeight: 'bold' }}>Форматированный ключ: </span>{formattedKey}</p>}
                            {codeMessage && <p ><span style={{ fontWeight: 'bold' }}>Закодированное сообщение: </span>{codeMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const TableViewBlock = ({ cryptoMatrix, showTableView, message, formattedKey, codeMessage }) => (
    <div>
        <h5>Шифрующая таблица</h5>
        <table className="vish-table table" onClick={() => { showTableView() }} data-toggle="modal" data-target="#exampleModal">
            <tbody>
                {cryptoMatrix.map((row, indexRow) =>
                    <tr key={indexRow}>
                        {row.map((item, index) => {
                            return <td key={index} className={`${index === 0 || indexRow === 0 ? 'main' : ''}`}>{item}</td>
                        }
                        )}
                    </tr>
                )}
            </tbody>
        </table>
        <TableViewBlockModal cryptoMatrix={cryptoMatrix} message={message} formattedKey={formattedKey} codeMessage={codeMessage} />
    </div>
)

const ResultBlock = ({ codeMessage, cryptoMatrix, showTableView, formattedKey, message }) => (
    <div className="vizh-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-xs-12 matrix">
                    {cryptoMatrix && cryptoMatrix.length > 0 && <TableViewBlock cryptoMatrix={cryptoMatrix} showTableView={showTableView} codeMessage={codeMessage} formattedKey={formattedKey} message={message} />}
                </div>
                <div className="col-md-6 col-xs-12" style={{ paddingLeft: '85px', paddingTop: '60px' }}>
                    <div className="code-block">
                        {codeMessage &&
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12" >
                                        <h6>Зашифрованное сообщение:</h6>
                                        <p>{codeMessage}</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {formattedKey &&
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12" >
                                        <h6>Форматированный ключ:</h6>
                                        <p>{formattedKey}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
)

class VizhCode extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
        offset: 0,
        message: '',
        formattedKey: '',
    }

    calc = (key, message, offset, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key, offset)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ formattedKey: result.formattedKey })
        this.setCryptoMatrixView(result.cryptoMatrix, result.alphabetSet)

    }

    showTableView = () => {

    }

    setCryptoMatrixView = (matrix, alphabetSet) => {
        let cryptoMatrix = matrix.slice(0)
        cryptoMatrix.unshift(alphabetSet.slice(0))
        cryptoMatrix[0].unshift('*')
        for (let i = 1; i < cryptoMatrix.length; i++) {
            cryptoMatrix[i].unshift(alphabetSet[i - 1])
        }
        this.setState({ cryptoMatrix: cryptoMatrix })
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
                    <div className="col-md-9 col-xs-12 result-vizh">
                        {this.state.codeMessage && <ResultBlock codeMessage={this.state.codeMessage} cryptoMatrix={this.state.cryptoMatrix} showTableView={this.showTableView} formattedKey={this.state.formattedKey} />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            В шифре Цезаря каждая буква алфавита сдвигается на несколько позиций;
                            например в шифре Цезаря при сдвиге +3, A стало бы D, B стало бы E и так далее.
                            Шифр Виженера состоит из последовательности нескольких шифров Цезаря с различными
                            значениями сдвига. Для зашифровывания может использоваться таблица алфавитов,
                            называемая tabula recta или квадрат (таблица) Виженера. Применительно к латинскому
                            алфавиту таблица Виженера составляется из строк по 26 символов, причём каждая
                            следующая строка сдвигается на несколько позиций. Таким образом, в таблице получается
                            26 различных шифров Цезаря. На каждом этапе шифрования используются различные алфавиты,
                            выбираемые в зависимости от символа ключевого слова.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default VizhCode