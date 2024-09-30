import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import {
  GROUP_PAGE_MENU,
  GroupMenuProps,
  LANDING_PAGE_MENU,
  MenuProps,
} from "./menus"
import {
  CREATE_GROUP_PLACEHOLDER,
  CreateGroupPlaceholderProps,
} from "./placeholder"
import { GROUP_LIST, GroupListProps } from "./slider"

type SamawaConstantsProps = {
  landingPageMenu: MenuProps[]
  signUpForm: AuthFormProps[]
  signInForm: AuthFormProps[]
  groupList: GroupListProps[]
  createGroupPlaceholder: CreateGroupPlaceholderProps[]
  groupPageMenu: MenuProps[]
}

export const SAMAWA_CONSTANTS: SamawaConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  groupList: GROUP_LIST,
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
  groupPageMenu: GROUP_PAGE_MENU,
}

export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]
export const SUPPORTED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"]
