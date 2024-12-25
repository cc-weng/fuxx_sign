import { signApi } from '@/apis/signApi'
import LoginBanner from '@/assets/images/login.svg'
import LoginBannerDark from '@/assets/images/login-dark.svg'
import { Form, FormRef, FormRules } from '@/components/Form/Form'
import { FormItem } from '@/components/Form/FormItem'
import { HelperItem } from '@/components/Form/HelperItem'
import { userActions } from '@/data/features/user'
import { RootState } from '@/data/store'
import { useApi } from '@/hooks/useApi'
import { constants } from '@/utils/global'
import { ux } from '@/utils/tools'
import { Box, Button, Checkbox, FormControlLabel, Switch, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import css from './index.module.scss'

/**
 * 登录主模块
 */
export default function () {
    const user = useSelector((state: RootState) => state.user)
    const system = useSelector((state: RootState) => state.system)
    const dispatch = useDispatch()
    const formRef = useRef<FormRef>(null)
    const [, setSign] = useApi(signApi.sign)
    const [agree, setAgree] = useState(false)

    const formRules: FormRules = {
        name: { required: true, message: '请输入姓名' },
        code: { required: true, message: '请输入学号' },
    }

    const handler = {
        async onSubmit() {
            const err = formRef.current?.validate()
            if (err?.length) {
                return ux.notify(err[0], 'warning')
            }
            if (!agree) {
                return ux.notify('请阅读并同意<免责声明>', 'warning')
            }
            const data = formRef.current?.data()!

            const res = await setSign({
                name: data.name,
                code: data.code,
                choose: data.choose ? 1 : 0
            })
            dispatch(userActions.setUserInfo(formRef.current?.data()))
            ux.notify(res, 'success')
        },
        onClickProtocol(e: React.MouseEvent) {
            e.stopPropagation()
            e.preventDefault()
            ux.dialog('登录即代表本人自愿以正当目的使用本应用，开发者不承担任何风险和责任。')
        },
    }

    return (
        <div className={css.root}>
            <div className={css.wrapper}>
                <img src={system.mediaTheme === 'light' ? LoginBanner : LoginBannerDark} className={css.banner} />
                <div className={css.form}>
                    <div className={css.title}>计算机学院签到系统</div>
                    <Typography variant="caption" sx={{ color: 'GrayText', mx: '2rem', mb: '1rem' }}>Version: {constants.APP_VERSION}</Typography>
                    <Form rules={formRules} defaultValue={{ choose: true, ...user.userInfo }} ref={formRef}>
                        <Box className={css.content}>
                            <FormItem disableHelperText name='code' labelPosition='left'>
                                <TextField
                                    size="small"
                                    placeholder="请输入学号"
                                    fullWidth
                                />
                            </FormItem>
                            <FormItem disableHelperText name='name' labelPosition='left'>
                                <TextField
                                    size="small"
                                    placeholder="请输入姓名"
                                    fullWidth
                                />
                            </FormItem>
                            <Box sx={{ ml: '-1.5rem', mb: '-0.75rem', width: '100%' }}>
                                <FormItem name='choose'>
                                    <HelperItem control={<Switch size='small' />} label="使用新URL" />
                                </FormItem>
                            </Box>
                            <Button onClick={handler.onSubmit} type="submit" variant="contained" fullWidth>
                                签到(自动识别当前课程)
                            </Button>
                            <FormControlLabel
                                className={css.policyBar}
                                control={
                                    <Checkbox size='small' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                }
                                label={
                                    <div className={css.policy}>
                                        我已阅读并同意
                                        <span className={css.highlight} onClick={handler.onClickProtocol}>《免责声明》</span>
                                    </div>
                                }
                            />
                        </Box>
                    </Form>
                </div>
            </div>
        </div>
    )
}
