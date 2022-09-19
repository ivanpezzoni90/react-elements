import {
    FaCaretDown,
    FaCaretUp,
    FaCaretLeft,
    FaCaretRight,
    FaSearchMinus,
    FaSearchPlus,
    FaSearch,
    FaShareAlt,
    FaShippingFast,
    FaShoppingCart,
    FaSignInAlt,
    FaSignOutAlt,
    FaTrash,
    FaTrashAlt,
    FaUserAlt,
    FaUserPlus,
    FaUsers,
    FaVolumeDown,
    FaVolumeMute,
    FaVolumeOff,
    FaVolumeUp,
    FaRegComment,
    FaRegCommentAlt,
    FaRedo,
    FaUndo,
    FaPlus,
    FaPhone,
    FaPhoneAlt,
    FaPaste,
    FaRegCopy,
    FaHome,
    FaGripHorizontal,
    FaGripLinesVertical,
    FaGripLines,
    FaGripVertical,
    FaEyeSlash,
    FaEye,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaDownload,
    FaSpinner,
    FaCircleNotch,
    FaCog
} from 'react-icons/fa';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
    GiWolverineClaws,
    GiToolbox,
    GiAura,
    GiZeppelin,
    GiBroadDagger,
    GiBroadsword,
    GiRuneSword,
} from 'react-icons/gi';
import { IconType } from 'react-icons/lib';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiLoader5Line } from 'react-icons/ri';
import {
    BiLoaderCircle,
    BiLoader
} from 'react-icons/bi';
import {
    BsStar,
    BsStarHalf,
    BsStarFill,
    BsHeart,
    BsHeartHalf,
    BsHeartFill
} from 'react-icons/bs';

export enum IconList {
    caretDown = 'caret-down',
    caretUp = 'caret-up',
    caretLeft = 'caret-left',
    caretRight = 'caret-right',
    check = 'check',
    close = 'close',
    outlineClose = 'outline-close',
    searchMinus = 'search-minus',
    searchPlus = 'search-plus',
    search = 'search',
    shareAlt = 'share-alt',
    shippingFast = 'shipping-fast',
    shoppingCart = 'shopping-cart',
    signInAlt = 'sign-in-alt',
    signOutAlt = 'sign-out-alt',
    trash = 'trash',
    trashAlt = 'trash-alt',
    userAlt = 'user-alt',
    userPlus = 'user-plus',
    users = 'users',
    volumeDown = 'volume-down',
    volumeMute = 'volume-mute',
    volumeOff = 'volume-off',
    volumeUp = 'volume-up',
    regComment = 'reg-comment',
    regCommentAlt = 'reg-comment-alt',
    redo = 'redo',
    undo = 'undo',
    plus = 'plus',
    phone = 'phone',
    phoneAlt = 'phone-alt',
    paste = 'paste',
    regCopy = 'reg-copy',
    home = 'home',
    gripHorizontal = 'grip-horizontal',
    gripLinesVertical = 'grip-lines-vertical',
    gripLines = 'grip-lines',
    gripVertical = 'grip-vertical',
    eyeSlash = 'eye-slash',
    eye = 'eye',
    exclamationCircle = 'exclamation-circle',
    exclamationTriangle = 'exclamation-triangle',
    download = 'download',
    wolverineClaws = 'wolverine-claws',
    toolbox = 'toolbox',
    aura = 'aura',
    zeppelin = 'zeppelin',
    broadDagger = 'broad-dagger',
    broadsword = 'broadsword',
    runeSword = 'rune-sword',
    spinner = 'spinner',
    circleNotch = 'circle-notch',
    cog = 'cog',
    outlineRefresh = 'outline-refresh',
    loader5Line = 'loader5-line',
    loaderCircle = 'loader-circle',
    loader = 'loader',
    star = 'star,',
    starHalf = 'star-half,',
    starFill = 'star-fill,',
    heart = 'heart,',
    heartHalf = 'heart-half,',
    heartFill = 'heart-fill'
}

interface IconInterface {
    [key: string]: IconType
}
export const iconMap: IconInterface = {
    [IconList.caretDown]: FaCaretDown,
    [IconList.caretUp]: FaCaretUp,
    [IconList.caretLeft]: FaCaretLeft,
    [IconList.caretRight]: FaCaretRight,
    [IconList.close]: IoCloseSharp,
    [IconList.check]: IoCheckmarkSharp,
    [IconList.outlineClose]: AiOutlineCloseCircle,
    [IconList.searchMinus]: FaSearchMinus,
    [IconList.searchPlus]: FaSearchPlus,
    [IconList.search]: FaSearch,
    [IconList.shareAlt]: FaShareAlt,
    [IconList.shippingFast]: FaShippingFast,
    [IconList.shoppingCart]: FaShoppingCart,
    [IconList.signInAlt]: FaSignInAlt,
    [IconList.signOutAlt]: FaSignOutAlt,
    [IconList.trash]: FaTrash,
    [IconList.trashAlt]: FaTrashAlt,
    [IconList.userAlt]: FaUserAlt,
    [IconList.userPlus]: FaUserPlus,
    [IconList.users]: FaUsers,
    [IconList.volumeDown]: FaVolumeDown,
    [IconList.volumeMute]: FaVolumeMute,
    [IconList.volumeOff]: FaVolumeOff,
    [IconList.volumeUp]: FaVolumeUp,
    [IconList.regComment]: FaRegComment,
    [IconList.regCommentAlt]: FaRegCommentAlt,
    [IconList.redo]: FaRedo,
    [IconList.undo]: FaUndo,
    [IconList.plus]: FaPlus,
    [IconList.phone]: FaPhone,
    [IconList.phoneAlt]: FaPhoneAlt,
    [IconList.paste]: FaPaste,
    [IconList.regCopy]: FaRegCopy,
    [IconList.home]: FaHome,
    [IconList.gripHorizontal]: FaGripHorizontal,
    [IconList.gripLinesVertical]: FaGripLinesVertical,
    [IconList.gripLines]: FaGripLines,
    [IconList.gripVertical]: FaGripVertical,
    [IconList.eyeSlash]: FaEyeSlash,
    [IconList.eye]: FaEye,
    [IconList.exclamationCircle]: FaExclamationCircle,
    [IconList.exclamationTriangle]: FaExclamationTriangle,
    [IconList.download]: FaDownload,
    [IconList.wolverineClaws]: GiWolverineClaws,
    [IconList.toolbox]: GiToolbox,
    [IconList.aura]: GiAura,
    [IconList.zeppelin]: GiZeppelin,
    [IconList.broadDagger]: GiBroadDagger,
    [IconList.broadsword]: GiBroadsword,
    [IconList.runeSword]: GiRuneSword,
    [IconList.spinner]: FaSpinner,
    [IconList.circleNotch]: FaCircleNotch,
    [IconList.cog]: FaCog,
    [IconList.outlineRefresh]: HiOutlineRefresh,
    [IconList.loader5Line]: RiLoader5Line,
    [IconList.loaderCircle]: BiLoaderCircle,
    [IconList.loader]: BiLoader,
    [IconList.star]: BsStar,
    [IconList.starHalf]: BsStarHalf,
    [IconList.starFill]: BsStarFill,
    [IconList.heart]: BsHeart,
    [IconList.heartHalf]: BsHeartHalf,
    [IconList.heartFill]: BsHeartFill,
};