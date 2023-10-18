export default function KaKaoLoginButton() {
  const { loginWithKakao } = useUser()

  const onClick = () => {
    loginWithKakao()
  }

  return (
    <div>
      <button onClick={onClick}>카카오 로그인</button>
    </div>
  )
}
