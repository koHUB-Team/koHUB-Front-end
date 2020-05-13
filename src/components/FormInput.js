import React, { Component } from "react";
import "./FormInput.scss";
import Cleave from "cleave.js/react";
import { ValidateUtil } from "../common/kohubUtil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//****FormInput 컴포넌트****//
//props
//id : input 태그 id 선택자 값
//type(필수) : input 태그 type 속성 값 ex) text, email, 등등
//name(필수) : input 태그 name 속성 값
//placeholder : input 태그 placeholder 속성 값
//validOption(필수) : 유효성 검사 옵션 ex) title, name, nickname, email, date....
//onBlur : onBlur 이벤트 콜백함수
//onFocus : onFocus 이벤트 콜백함수
//onChange : onChange 이벤트 콜백함수

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.VALID_OPTION = {
      TITLE: "title",
      NAME: "name",
      NICKNAME: "nickname",
      EMAIL: "email",
      DATE: "date",
    };
  }

  getId() {
    let { id } = this.props;
    if (id !== undefined) {
      return id;
    }

    return "";
  }

  getType() {
    let { type } = this.props;
    if (type !== undefined) {
      return type;
    }

    return "";
  }

  getName() {
    let { name } = this.props;
    if (name !== undefined) {
      return name;
    }

    return "";
  }

  getPlaceholder() {
    let { placeholder } = this.props;
    if (placeholder !== undefined) {
      return placeholder;
    }

    return "";
  }

  getInput() {
    let type = this.getType();
    let name = this.getName();
    let placeholder = this.getPlaceholder();

    let { validOption } = this.props;
    switch (validOption) {
      case this.VALID_OPTION.DATE:
        return (
          <DatePicker
            type={type}
            name={name}
            placeholder={placeholder}
            selected={this.state.date}
            onChange={this.onEmailChange.bind(this)}
          />
        );
      default:
        return (
          <Cleave
            type={type}
            name={name}
            placeholder={placeholder}
            onBlur={this.onBlurListener.bind(this)}
            onFocus={this.onFocusListener.bind(this)}
            onChange={this.onChangeListener.bind(this)}
          ></Cleave>
        );
    }
  }

  onChangeListener(e) {
    //콜백함수가 있으면 실행.
    let { onChange } = this.props;
    if (onChange !== undefined) {
      onChange();
    }
  }

  onEmailChange(newDate) {
    this.setState({
      date: newDate,
    });

    //콜백함수가 있으면 실행.
    let { onChange } = this.props;
    if (onChange !== undefined) {
      onChange();
    }
  }

  onFocusListener(e) {
    //콜백함수가 있으면 실행.
    let { onFocus } = this.props;
    if (onFocus !== undefined) {
      onFocus();
    }
  }

  onBlurListener(e) {
    //유효성 옵션에 따라 이벤트 리스너 호출
    let { validOption } = this.props;
    let inputNode;
    switch (validOption) {
      case this.VALID_OPTION.TITLE:
        inputNode = e.target;
        this.onTitleBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.NAME:
        inputNode = e.target;
        this.onNameBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.NICKNAME:
        inputNode = e.target;
        this.onNicknameBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.EMAIL:
        inputNode = e.target;
        this.onEmailBlur(inputNode, inputNode.value);
        break;
      default:
        break;
    }

    //콜백함수가 있으면 실행.
    let { onBlur } = this.props;
    if (onBlur !== undefined) {
      onBlur();
    }
  }

  onTitleBlur(inputNode, title) {
    if (title.length < 3) {
      inputNode.value = "제목은 3자 이상 입력해야합니다.";
    }
  }

  onNameBlur(inputNode, name) {
    if (name.length < 3) {
      inputNode.value = "이름은 3자 이상 입력해야합니다.";
      return;
    }

    if (!ValidateUtil.nameValidate(name) && name !== "") {
      inputNode.value = "이름은 문자로만 이루어져야 합니다.";
    }
  }

  onNicknameBlur(inputNode, nickname) {
    if (nickname.length < 2) {
      inputNode.value = "이름은 2자 이상 입력해야합니다.";
      return;
    }

    if (!ValidateUtil.nicknameValidate(nickname) && nickname !== "") {
      inputNode.value = "닉네임은 문자, 숫자로만 이루어져야 합니다.";
    }
  }

  onEmailBlur(inputNode, email) {
    if (!ValidateUtil.emailValidate(email) && email !== "") {
      inputNode.value = "이메일 형식에 맞지 않습니다.";
    }
  }

  render() {
    let input = this.getInput();
    return <label className="kohub-form-input">{input}</label>;
  }
}

export default FormInput;