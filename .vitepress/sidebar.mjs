const sidebarOptions = {  
    documentRootPath: "/src",
    scanStartPath: '',
    resolvePath: '',  
    collapsed: false,   //折叠组关闭
    collapseDepth: 2,   //折叠组2级菜单
}; 

const lang = {
    documentRootPath: '/src',
    scanStartPath: 'lang',
    resolvePath: '/lang/'
}

const cxx = {
    documentRootPath: '/src',
    scanStartPath: 'lang/cxx',
    resolvePath: '/lang/cxx/'
}

const cxx0x = {
    documentRootPath: '/src',
    scanStartPath: 'lang/cxx/0x',
    resolvePath: '/lang/cxx/0x/'
}


const sidebarOptionsArray = [sidebarOptions, lang, cxx, cxx0x]

export default sidebarOptionsArray;