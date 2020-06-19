const os = require('os')
const pty = require('node-pty')
const Terminal = require('xterm').Terminal
const { FitAddon } = require('xterm-addon-fit')

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cwd: process.env.HOME,
  env: process.env
})

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal()
const fit = new FitAddon()
xterm.loadAddon(fit)
xterm.open(document.getElementById('xterm'))
fit.fit()
ptyProcess.resize(xterm.cols, xterm.rows)
// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data))
ptyProcess.onData(function (data) {
  xterm.write(data)
})

window.addEventListener("resize", function () {
  console.log("hello")
  fit.fit()
  ptyProcess.resize(xterm.cols, xterm.rows)
});

let links = document.getElementsByTagName("a")
for (let i=0;i<links.length;i++) {
  let link = links[i]
  let href = link.getAttribute("href")
  if (href != null && href.startsWith("http://www.linuxfromscratch.org/lfs/downloads/9.1/LFS-BOOK-9.1-NOCHUNKS.html")) {
    let splits = href.split("#")
    if (splits.length === 2) {
      link.setAttribute("href","#"+splits[1])
    }
  }
}

function convertKbdChildren(codeParent, kbdChild) {
  let codeChild = document.createElement('code');
  codeChild.innerHTML = kbdChild.innerHTML;

  codeParent.replaceChild(codeChild, kbdChild);
}

let codeParents = document.getElementsByClassName("userinput")
for (let i=0;i<codeParents.length;i++) {
  let codeParent = codeParents[i]
  codeParent.classList.add("language-bash")
  if (codeParent.childElementCount > 1) {
    console.log("This parent has multiple child")
    console.log(codeParent.outerHTML)
    let code = ""
    for(let j=0;j<codeParent.children.length;j++) {
      code = code + codeParent.children[j].innerHTML
    }
    let codeChild = document.createElement('code');
    codeChild.innerHTML = code;
    codeParent.innerHTML = ""
    codeParent.appendChild(codeChild)
  } else {
    if (codeParent.firstChild.tagName !== "KBD") {
      console.log("This parent has different child")
      console.log(codeParent.outerHTML)
      continue
    }
    let kbdChild = codeParent.firstChild
    convertKbdChildren(codeParent, kbdChild)
  }
}

//index to package list
let wgetList = `http://download.savannah.gnu.org/releases/acl/acl-2.2.53.tar.gz
http://download.savannah.gnu.org/releases/attr/attr-2.4.48.tar.gz
http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.xz
http://ftp.gnu.org/gnu/automake/automake-1.16.1.tar.xz
http://ftp.gnu.org/gnu/bash/bash-5.0.tar.gz
https://github.com/gavinhoward/bc/archive/2.5.3/bc-2.5.3.tar.gz
http://ftp.gnu.org/gnu/binutils/binutils-2.34.tar.xz
http://ftp.gnu.org/gnu/bison/bison-3.5.2.tar.xz
https://www.sourceware.org/pub/bzip2/bzip2-1.0.8.tar.gz
https://github.com/libcheck/check/releases/download/0.14.0/check-0.14.0.tar.gz
http://ftp.gnu.org/gnu/coreutils/coreutils-8.31.tar.xz
https://dbus.freedesktop.org/releases/dbus/dbus-1.12.16.tar.gz
http://ftp.gnu.org/gnu/dejagnu/dejagnu-1.6.2.tar.gz
http://ftp.gnu.org/gnu/diffutils/diffutils-3.7.tar.xz
https://downloads.sourceforge.net/project/e2fsprogs/e2fsprogs/v1.45.5/e2fsprogs-1.45.5.tar.gz
https://sourceware.org/ftp/elfutils/0.178/elfutils-0.178.tar.bz2
https://dev.gentoo.org/~blueness/eudev/eudev-3.2.9.tar.gz
https://prdownloads.sourceforge.net/expat/expat-2.2.9.tar.xz
https://prdownloads.sourceforge.net/expect/expect5.45.4.tar.gz
ftp://ftp.astron.com/pub/file/file-5.38.tar.gz
http://ftp.gnu.org/gnu/findutils/findutils-4.7.0.tar.xz
https://github.com/westes/flex/releases/download/v2.6.4/flex-2.6.4.tar.gz
http://ftp.gnu.org/gnu/gawk/gawk-5.0.1.tar.xz
http://ftp.gnu.org/gnu/gcc/gcc-9.2.0/gcc-9.2.0.tar.xz
http://ftp.gnu.org/gnu/gdbm/gdbm-1.18.1.tar.gz
http://ftp.gnu.org/gnu/gettext/gettext-0.20.1.tar.xz
http://ftp.gnu.org/gnu/glibc/glibc-2.31.tar.xz
http://ftp.gnu.org/gnu/gmp/gmp-6.2.0.tar.xz
http://ftp.gnu.org/gnu/gperf/gperf-3.1.tar.gz
http://ftp.gnu.org/gnu/grep/grep-3.4.tar.xz
http://ftp.gnu.org/gnu/groff/groff-1.22.4.tar.gz
https://ftp.gnu.org/gnu/grub/grub-2.04.tar.xz
http://ftp.gnu.org/gnu/gzip/gzip-1.10.tar.xz
http://anduin.linuxfromscratch.org/LFS/iana-etc-2.30.tar.bz2
http://ftp.gnu.org/gnu/inetutils/inetutils-1.9.4.tar.xz
https://launchpad.net/intltool/trunk/0.51.0/+download/intltool-0.51.0.tar.gz
https://www.kernel.org/pub/linux/utils/net/iproute2/iproute2-5.5.0.tar.xz
https://www.kernel.org/pub/linux/utils/kbd/kbd-2.2.0.tar.xz
https://www.kernel.org/pub/linux/utils/kernel/kmod/kmod-26.tar.xz
http://www.greenwoodsoftware.com/less/less-551.tar.gz
http://www.linuxfromscratch.org/lfs/downloads/9.1/lfs-bootscripts-20191031.tar.xz
https://www.kernel.org/pub/linux/libs/security/linux-privs/libcap2/libcap-2.31.tar.xz
ftp://sourceware.org/pub/libffi/libffi-3.3.tar.gz
http://download.savannah.gnu.org/releases/libpipeline/libpipeline-1.5.2.tar.gz
http://ftp.gnu.org/gnu/libtool/libtool-2.4.6.tar.xz
https://www.kernel.org/pub/linux/kernel/v5.x/linux-5.5.3.tar.xz
http://ftp.gnu.org/gnu/m4/m4-1.4.18.tar.xz
http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
http://download.savannah.gnu.org/releases/man-db/man-db-2.9.0.tar.xz
https://www.kernel.org/pub/linux/docs/man-pages/man-pages-5.05.tar.xz
https://github.com/mesonbuild/meson/releases/download/0.53.1/meson-0.53.1.tar.gz
https://ftp.gnu.org/gnu/mpc/mpc-1.1.0.tar.gz
http://www.mpfr.org/mpfr-4.0.2/mpfr-4.0.2.tar.xz
https://github.com/ninja-build/ninja/archive/v1.10.0/ninja-1.10.0.tar.gz
http://ftp.gnu.org/gnu/ncurses/ncurses-6.2.tar.gz
https://www.openssl.org/source/openssl-1.1.1d.tar.gz
http://ftp.gnu.org/gnu/patch/patch-2.7.6.tar.xz
https://www.cpan.org/src/5.0/perl-5.30.1.tar.xz
https://pkg-config.freedesktop.org/releases/pkg-config-0.29.2.tar.gz
https://sourceforge.net/projects/procps-ng/files/Production/procps-ng-3.3.15.tar.xz
https://sourceforge.net/projects/psmisc/files/psmisc/psmisc-23.2.tar.xz
https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tar.xz
https://www.python.org/ftp/python/doc/3.8.1/python-3.8.1-docs-html.tar.bz2
http://ftp.gnu.org/gnu/readline/readline-8.0.tar.gz
http://ftp.gnu.org/gnu/sed/sed-4.8.tar.xz
https://github.com/shadow-maint/shadow/releases/download/4.8.1/shadow-4.8.1.tar.xz
http://www.infodrom.org/projects/sysklogd/download/sysklogd-1.5.1.tar.gz
https://github.com/systemd/systemd/archive/v244/systemd-244.tar.gz
http://anduin.linuxfromscratch.org/LFS/systemd-man-pages-244.tar.xz
http://download.savannah.gnu.org/releases/sysvinit/sysvinit-2.96.tar.xz
http://ftp.gnu.org/gnu/tar/tar-1.32.tar.xz
https://downloads.sourceforge.net/tcl/tcl8.6.10-src.tar.gz
http://ftp.gnu.org/gnu/texinfo/texinfo-6.7.tar.xz
https://www.iana.org/time-zones/repository/releases/tzdata2019c.tar.gz
http://anduin.linuxfromscratch.org/LFS/udev-lfs-20171102.tar.xz
https://www.kernel.org/pub/linux/utils/util-linux/v2.35/util-linux-2.35.1.tar.xz
http://anduin.linuxfromscratch.org/LFS/vim-8.2.0190.tar.gz
https://cpan.metacpan.org/authors/id/T/TO/TODDR/XML-Parser-2.46.tar.gz
https://tukaani.org/xz/xz-5.2.4.tar.xz
https://zlib.net/zlib-1.2.11.tar.xz
https://github.com/facebook/zstd/releases/download/v1.4.4/zstd-1.4.4.tar.gz
http://www.linuxfromscratch.org/patches/lfs/9.1/bash-5.0-upstream_fixes-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/bzip2-1.0.8-install_docs-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/coreutils-8.31-i18n-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/glibc-2.31-fhs-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/kbd-2.2.0-backspace-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/sysvinit-2.96-consolidated-1.patch
`
let packages = []
wgetList.split("\n").forEach(function (wg) {
  let splits = wg.split("/")
  let pkgName = splits[splits.length-1]
  packages.push(pkgName)
  //console.log(pkgName)
})

let wraps = document.querySelectorAll('.wrap')
wraps.forEach(function (wrap) {
  let titlePage = wrap.querySelector(".titlepage")
  let instl = wrap.querySelector(".installation")
  let title = titlePage.querySelector(".title").innerText
  if (title.startsWith("5") || title.startsWith("6")) {
    //console.log(title)
    let pkgName = title.split(/\u00A0/g)[1].split(" ")[0]
    pkgName = pkgName.split(/-d+/)[0]
    if (pkgName === "Libstdc++") {
      pkgName = "GCC"
    }
    if (pkgName === "Libelf") {
      pkgName = "Elfutils"
    }
    console.log(pkgName)
    let tarPkgName = null
    packages.forEach(function (pkg) {
      if(pkg.endsWith(".patch"))
        return
      let pkkg = pkg.replace(/-/g,"").replace("::","").toLowerCase()
      let pName = pkgName.replace(/-/g,"").replace("::","").toLowerCase()
      if(pkkg.includes(pName)) {
        if (pkg.startsWith("python") && pkg.includes("doc")) {
          return
        }
        console.log("Found:   "+pkg)
        if (tarPkgName == null) {
          tarPkgName = pkg
        } else {
          throw "multiple package found for "+pkgName
        }
      }
    })
    if (tarPkgName != null) {
      let newFirstElement = document.createElement("pre")
      newFirstElement.classList.add("userinput", "language-bash")
      newFirstElement.innerHTML = "<code>tar xvf " + tarPkgName + " --one-top-level=extracted_files --strip-components 1 && cd extracted_files </code>"
      instl.insertBefore(newFirstElement, instl.firstChild);

      let newLastElement = document.createElement("pre")
      newLastElement.classList.add("userinput", "language-bash")
      newLastElement.innerHTML = "<code>cd $LFS/sources/  && rm -rf extracted_files </code>"
      instl.appendChild(newLastElement);
    } else {
      console.log("Not found for package: "+pkgName)
    }
  }
})
//


Prism.plugins.toolbar.registerButton('hello-world', {
  text: 'Run in Terminal', // required
  onClick: function (env) { // optional
    console.log("code: "+env.code)
    let code = env.code + "\n"
    //xterm.write(env.code)
    ptyProcess.write(code)
  }
});


