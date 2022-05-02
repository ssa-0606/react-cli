import './App.css';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      albums:[],
      page:1
    }
    this.page_num = 1
    this.limit_count = 4
    this.sort_by = 'id'
    this.order_way = 'asc'
  }
  
  componentDidMount(){
    this.getInfo()
  }
  getInfo = ()=>{
    fetch(`http://47.93.176.203:3000/albums?_page=${this.page_num}&_limit=${this.limit_count}&_sort=${this.sort_by}&_order=${this.order_way}`)
    .then(resq=>resq.json())
    .then(info=> {
      this.setState({albums:info})
    })
  }

  prePage = (event) =>{
    const current_page = this.state.page;
    if(current_page === 1){
      return
    }else{
      this.setState({page:--this.page_num})
      this.getInfo()
    }
  }

  nextPage = () =>{
    const current_page = this.state.page;
    if(current_page === 4){
      return
    }else{
      this.setState({page:++this.page_num})
      this.getInfo()
    }
  }

  jumpTo = (page) => {
    return (event) => {
      event.preventDefault();
      this.page_num = page
      this.setState({page:page})
      this.getInfo()
    }
  }

  getPageNum = () =>{
    let pageNums = [];
    for(let i=1;i<5;i++){
      pageNums.push(<li key={i} className={this.state.page===i?'current-page':''}><a onClick={this.jumpTo(i)} href='#'>{i}</a></li>)
    }
    return pageNums;
  }

  sortfunc = (props) =>{
    return () =>{
      if(this.sort_by === props){
        this.order_way = this.order_way==='asc'?'desc':'asc'
        this.getInfo()
      }else{
        this.sort_by = props;
        this.getInfo()
      }
    }
  }
  getIcon = (props) =>{
    if(this.sort_by === props){
      if(this.order_way === 'asc'){
        return <FontAwesomeIcon icon={['fas', 'sort-up']} color='red' />
      }else{
        return <FontAwesomeIcon icon={['fas', 'sort-down']} color='green' />
      }
    }else{
      return <FontAwesomeIcon icon={['fas', 'sort-amount-up-alt']} color='skyblue' />
    }
  }

  render() {
    return (
      <div className='music_box'>
        <h1>
          This is music info application(Test....)
        </h1>
        <table>
          <thead>
            <tr>
              <th onClick={this.sortfunc('id')}>ID{this.getIcon('id')} </th>
              <th onClick={this.sortfunc('name')}>专辑名称{this.getIcon('name')}</th>
              <th onClick={this.sortfunc('price')}>专辑价格{this.getIcon('price')}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.albums.map((album)=>
                <tr key={album.id}>
                  <td className='table_width'>{album.id}</td>
                  <td className='table_width1'>{album.name}</td>
                  <td className='table_width1'>{album.price}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className='page-box'>
            <div onClick={this.prePage}>上一页</div>
            <ul>
              {
                this.getPageNum()
              }
            </ul>
            <div onClick={this.nextPage}>下一页</div>
        </div>
      </div>
    );
  }
}

