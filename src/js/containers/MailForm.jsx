import React from "react"
// components
import Btn from "../components/Btn"

const MailForm = () => {
  return (
    <div>
      <h1>MailForm</h1>
      <form action={`${window.location.href}assets/mailer.php`} method="post">
        <p>件名:<br/><input name="title" defaultValue="テストメールだお" /></p>
        <p>名前:<br/><input name="name" defaultValue="テストマン" /></p>
        <p>age:<br/><input name="age" defaultValue={28} /></p>
        <p>メルアド:<br/><input name="userAddress" defaultValue="kiki@metal.com" /></p>
        <p>送り先のメルアド:<br/><input name="address" defaultValue="reezafratzitz2@gmail.com" placeholder="自分で確認できるやつ入れな" /></p>
        <p>本文:<br/><textarea name="message" rows="8" cols="30"></textarea></p>
        <p><Btn type="submit" style={{width: "300px"}}>Send</Btn></p>
      </form>
    </div>
  )
}
export default MailForm
