import { useFormItem } from "@/hooks/useFormItem"
import { Stack, Typography } from "@mui/material"
import { ChangeEvent, ReactElement, Ref, cloneElement, forwardRef, useMemo } from "react"

export type FormItemProps = {
    name: string
    label?: string
    labelPosition?: 'top' | 'left' | 'bottom' | 'right'
    spacing?: number
    children?: ReactElement
    disableHelperText?: boolean
}

function FormItemRaw(props: FormItemProps, ref: Ref<any>) {
    const controller = useFormItem(props.name)

    const direction = useMemo(() => {
        switch (props.labelPosition) {
            case 'top':
                return 'column'
            case 'left':
                return 'row'
            case 'bottom':
                return 'column-reverse'
            case 'right':
                return 'row-reverse'
        }
    }, [props.labelPosition])

    const alignItems = useMemo(() => {
        switch (props.labelPosition) {
            case 'top':
                return 'flex-start'
            case 'left':
                return 'center'
            case 'bottom':
                return 'flex-end'
            case 'right':
                return 'center'
        }
    }, [props.labelPosition])

    const onChangeDelegate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // 探测是否为checkbox
        const isCheckbox = e.target.type === 'checkbox'
        const isRadio = e.target.type === 'radio'
        const value = isCheckbox || isRadio ? (e.target as any).checked : e.target.value
        controller.setState(value)
    }

    const memoChildren = useMemo(() => props.children && cloneElement(props.children, {
        onChange: onChangeDelegate,
        ref,
        value: controller.value ?? '',
        error: controller.error ?? false,
        helperText: props.disableHelperText ? '' : controller.helperText ?? ''
    }), [props.children, controller.error, controller.helperText, controller.value])

    return (
        <Stack direction={direction} spacing={props.spacing ?? 1} width='100%' alignItems={alignItems}>
            {!!props.label && <Typography style={{ flexShrink: 0 }}>{props.label}</Typography>}
            {memoChildren}
        </Stack>
    )
}

export const FormItem = forwardRef(FormItemRaw)