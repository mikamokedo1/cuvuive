# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - img "Owl Companion" [ref=e7]
      - generic [ref=e8]:
        - generic [ref=e9]:
          - heading "Đăng Nhập" [level=1] [ref=e10]
          - paragraph [ref=e11]: Chào mừng bé quay lại 👋
        - button "Đăng nhập bằng Google" [ref=e13] [cursor=pointer]:
          - img [ref=e14]
          - text: Đăng nhập bằng Google
        - generic [ref=e23]: hoặc
        - generic [ref=e24]:
          - generic [ref=e26]:
            - img [ref=e28]
            - textbox "Email" [ref=e30]
          - generic [ref=e31]:
            - generic [ref=e32]:
              - img [ref=e34]
              - textbox "Mật khẩu" [ref=e36]
              - button [ref=e37]:
                - img [ref=e38]
            - link "Quên mật khẩu?" [ref=e42] [cursor=pointer]:
              - /url: /auth/forgot-password
          - button "Đăng Nhập" [ref=e43] [cursor=pointer]
        - paragraph [ref=e45]:
          - text: Chưa có tài khoản?
          - link "Đăng ký" [ref=e46] [cursor=pointer]:
            - /url: /auth/sign-up
  - button "Open Next.js Dev Tools" [ref=e52] [cursor=pointer]:
    - img [ref=e53]
  - alert [ref=e56]
  - img "Owl Companion" [ref=e60]
```