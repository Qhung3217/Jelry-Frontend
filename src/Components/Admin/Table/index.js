import clsx from 'clsx'
import {Link} from 'react-router-dom'
import styles from '../MainPage.module.css'
import Search from '../Search'

function Table({
    th = [], 
    items, 
    title, 
    href, 
    showSearchResult, 
    nameKey, 
    reloadCallback, 
    urlAPI, 
    APIName, 
    tableEditName,
    hoverPanel = undefined
}) {
    const idKey = nameKey.replace('name','id')
    console.log(idKey)
    const handleDestroy= (id) => {
        const urlReq = urlAPI + '/'+ APIName +'/'+id
        // return console.log(urlReq)
        fetch(urlReq, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
            .then (res => res.json())
            .then (() => reloadCallback())
            .catch (err => alert("Remove failed!"+ err))
    }
    return (
        <div className={clsx(styles.card)}>
            <div className={clsx(styles.cardHeader)}>
            <h3 className={clsx(styles.cardTitle)}>{title}</h3>
            <div className={clsx(styles.cardTools)}>
                <div 
                    className={clsx(styles.reloadItem)}
                    onClick={reloadCallback}
                    id="reloadButton"
                >
                    Tải lại
                    <i className='bx bx-refresh'></i>
                </div>
                <Link to={href} className={clsx(styles.createBtn)}>
                    Thêm mới
                    <i className="fa-solid fa-plus"></i>
                </Link>
                <Search 
                    setSearchResult={showSearchResult} 
                    data={items} 
                    nameKey={nameKey}
                    reloadFunc={reloadCallback}
                />
            </div>
            </div>

            <div className={clsx(styles.cardBody)}>
            <table className={clsx(styles.table)}>
                <thead>
                    <tr>
                        {th.length > 0 && th.map((el,index) => (
                            <th key={index}>{el.name}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item,index) => (
                        <tr key={index}>
                        {th.map(el => (
                            
                            el.type && el.type === 'array' && el.type.length > 0 ?
                            <td key={el.name} style={{"whiteSpace": "pre-line"}}>
                                {item[el.name_code].map((itm) => {
                                    return el.columnsShow.map((column) => (
                                        ` Size: ${itm[column]} - SL tồn: ${itm.pivot[el.pivot]} 
                                        `
                                    ))
                                })}
                            </td>
                            :
                            
                            <td key={el.name}>{item[el.name_code]}</td>
                        ))
                        }
                        
                        <td >
                            <div className={clsx(styles.iconGroup)}>
                                <i
                                    className={clsx(styles.icon,styles.iconRemove,"fa-solid fa-square-xmark")}
                                    title="Remove this row item!"
                                    data-test={item[idKey]}
                                    onClick={() => handleDestroy(item[idKey])}
                                ></i>
                                <Link 
                                    to={"/admin/"+ tableEditName +"/edit/"+item[idKey]} 
                                    className={clsx(styles.icon,styles.iconEdit)}
                                >
                                    <i
                                    className={clsx("fa-solid fa-pen-to-square")}
                                    title="Edit this row item!"
                                    ></i>
                                </Link>
                            </div>
                        </td>
                        {hoverPanel &&
                            <div className={clsx(styles.hoverPanel)}>
                            {hoverPanel[item[idKey]] && hoverPanel[item[idKey]].map((img,index) => (
                                <div key={index} className={clsx(styles.imgItem)}>
                                    <img src={img} />
                                </div>
                            ))}
                            </div>
                        }
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Table