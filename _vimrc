"==========================="
" Neson's .vimrc 2013-04-11 "
"==========================="


" Encoding
set encoding=utf-8


" Layout
set t_Co=256
syntax on
set number
set cursorline
set ruler
"colorscheme torte
"colorscheme darkblue
"colorscheme wombat
"colorscheme grb256
"colorscheme codeschool
colorscheme distinguished
hi Normal ctermbg=none
hi Comment ctermbg=none
hi CursorLine cterm=none ctermbg=234
hi LineNr cterm=none ctermfg=darkgrey ctermbg=236


" Powerline
set nocompatible
set laststatus=2
"let g:Powerline_colorscheme='solarized256'
"let g:Powerline_symbols = 'fancy'


" Tabs
set ai				" 自動縮排
set shiftwidth=2	" 設定縮排字元數
set tabstop=4		" tab 寬度
" set softtabstop=2	" soft-tab 寬度


" Operating
set confirm
set history=1000


" Find
set ic				" 搜尋時忽略大小寫
set hlsearch		" 設定高亮度顯示搜尋結果
set incsearch		" 在關鍵字還沒完全輸入完畢前就顯示結果

" pathogen.vim
execute pathogen#infect()
