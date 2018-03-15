import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {markdown} from 'markdown';
import {Button} from 'reactstrap';

const Wraper=styled.div`
    width:300px;
    height:200px;
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows: 40px 120px 40px;
    margin-bottom:10px;
`
const Input=styled.input`
    outline:none;
    border:0;
    border-bottom:2px solid grey;
`

const Label=styled.div`
    width:100%;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    padding:0 10px;
    display:grid;
    align-items:center;
    grid-template-columns:230px 30px 30px;
    ${Wraper}:hover &{
        background-color:#2dbe60;
    }
`
const Description=styled.div`
    width:320px;
    overflow:hidden;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    font-weight:300;
    font-size:15px;
    color:black;
    padding:10px;
    padding-bottom:30px;
    ${Wraper}:hover &{
        background-color:#2dbe60;
        color:#fff;
    }
`
const TagsArea=styled.div`
    width:100%;
    display:grid;
    padding-left:5px;
    grid-template-columns:repeat(auto-fit,8px);
`
const Tag=styled.div`
    border-radius:100%;
    width:15px;
    height:15px;
    background-color: ${props=>props.color||'black'};
    z-index:100;
`
const Labelblock=styled.span`
    margin-right:20px;
    font-weight:700;
    font-size:20px;
    overflow:hidden;
    color:black;
    ${Wraper}:hover &{
        color:#fff;
    }
`
const Report=styled.img`
    width:24px;
    height:24px;
    content:url("https://www.evernote.com/redesign/global/js/focus/img/reminder_white_24x24.png");
    display:none;
    ${Wraper}:hover &{
        display:block;
    }
    ${Report}:hover{
        content:url("https://www.evernote.com/redesign/global/js/focus/img/reminder_solid_white_24x24.png");
    }
`
const Delete=styled.img`
    width:24px;
    height:24px;
    content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_white_24x24.png");
    display:none;
    ${Wraper}:hover &{
        display:block;
    }
    ${Delete}:hover{
        content:url("https://www.evernote.com/redesign/global/js/focus/img/delete_solid_white_24x24.png");
    }
`
const BottomInfo=styled.div`
    display:grid;
    align-content:center;
    grid-template-columns:150px 150px;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    ${Wraper}:hover &{
        background-color:#2dbe60;
        color:#fff;
    }
`
const NewReport=styled.div`
    position:absolute;
    padding:5px;
    height:100px;
    width:200px;
    display:none;
    justify-content:center;
    box-shadow: 0 2px 0 0 #d7d8db, 0 0 0 2px #e3e4e8;
    grid-template-rows:40px 50px;
    grid-gap:5px;
    z-index:1000;
    background-color:#fff;
`
const ButtonArea=styled.div`
    justify-self:end;
    aling-self:center;
    display:grid;
    grid-template-columns:1fr 1fr;
`

const DateBlock=styled.div`
    font-size:13px;
    font-family: gotham, helvetica, arial, sans-serif;
    color:#878787;
    ${Wraper}:hover &{
        color:#fff;
    }
`

class GridBlock extends React.Component{
    constructor(props){
        super(props);
        let ind=props.ind;
        if(props.data){
            let {label,desc,tags,folder,date,name}=props.data;
            this.state={
                label,
                desc,
                tags,
                folder,
                date,
                name,
                ind,
            }
        }
        else{
            this.state={
                label:"",
                desc:"",
                tags:[],
                folder:"",
                date:"",
                name:"",
                ind,
            }
        }
        this.onDel=this.onDel.bind(this);
        this.onRep=this.onRep.bind(this);
    }
    onDel(e){
        e.preventDefault();
        this.props.onDelete(this.state.ind);
    }
    onRep(){
        let block=document.getElementsByClassName("newReport")[this.state.ind];
        if(block.style.display==='grid'){
            block.style.display="none";
        }
        else{
            block.style.display="grid";
        }
    }
    render(){
        return(
            <Wraper>
                <Label><Labelblock className='label'></Labelblock><Report onClick={this.onRep}/><Delete onClick={this.onDel}/>
                    <NewReport className="newReport">
                        <Input type='email' placeholder="Email..." ref={(input) => { this.name = input; }}/>
                        <ButtonArea>
                            <Button padding="2px" grid-area="button" color="info" onClick={()=>{return console.log('Me')}}>Me</Button>
                            <Button padding="2px" grid-area="button" color="success" onClick={()=>{return console.log('Report')}}>Report</Button>
                        </ButtonArea>
                    </NewReport>
                </Label>
                <Description className='desc'></Description>
                <BottomInfo>
                <TagsArea>
                    {this.state.tags.map(({color,text})=>{
                        return <Tag color={color} title={text}></Tag>;
                    })}
                </TagsArea>
                <DateBlock>{this.state.date}</DateBlock>
                </BottomInfo>
            </Wraper>
        );
    }
    componentWillReceiveProps(nextProps){
        let ind=nextProps.ind;
        let {label,desc,tags,folder,date,name}=nextProps.data;
        this.setState({
            label,
            desc,
            tags,
            folder,
            date,
            ind,
            name,
        })
    }
    componentDidUpdate(){
        let el=document.getElementsByClassName('label')[this.state.ind];
        el.innerHTML=markdown.toHTML(this.state.label);
        el=document.getElementsByClassName('desc')[this.state.ind];
        let str=markdown.toHTML(this.state.desc);
        el.innerHTML=str.substring(3,str.length-4);
    }
    componentDidMount(){
        let el=document.getElementsByClassName('label')[this.state.ind];
        el.innerHTML=markdown.toHTML(this.state.label);
        el=document.getElementsByClassName('desc')[this.state.ind];
        let str=markdown.toHTML(this.state.desc);
        el.innerHTML=str.substring(3,str.length-4);
    }
}

/*function GridBlock(props){
        let {data}=props;
        return(
            <Wraper>
                <Label><Labelblock>{data.label}</Labelblock><Report onClick={(e)=>{
                    e.preventDefault();
                    this.props.onReport(data);
                }}/><Delete onClick={(e)=>{
                    e.preventDefault();
                    this.props.onDelete(data);
                }}/></Label>
                <Description value={data.desc}/>
                <BottomInfo>
                <TagsArea>
                    {data.tags && data.tags.map(({color,text})=>{
                        return <Tag color={color} title={text}></Tag>;
                    })}
                </TagsArea>
                <DateBlock>{data.date}</DateBlock>
                </BottomInfo>
            </Wraper>
        );
}*/

export default connect(
    state =>({
        store:state,
      }),
      dispatch => ({
        onDelete:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/notes/delete', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onload=()=>{
                  let datas=JSON.parse(xhr.responseText);
                  if(datas.success){
                    window.location.replace("#/user/Notes");
                    dispatch({type:'DELETE_NOTE',payload:data});
                  }
                };
                xhr.send(`index=${data}`);
                /*setTimeout(()=>{
                    window.location.replace("#/user/Notes");
                    dispatch({type:'DELETE_NOTE',payload:data});
                },200);*/
              }
            }
            dispatch(asyncSetData());
          },
        onReport:(data)=>{
            const asyncSetData= ()=>{
              return (dispatch)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('POST', '/api/notes/report', false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`index=${data}`);
              }
            }
            dispatch(asyncSetData());
          },
      }),
)(GridBlock)