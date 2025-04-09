## git

先克隆整个仓库，再切换到特定分支


git clone <远程仓库地址>


### branch

查看所有远程分支：
git branch -r


基于远程分支创建本地分支并切换到该分支：
git checkout -b <本地分支名> origin/<远程分支名>


git config --global https.proxy http://127.0.0.1:7890
git config --global http.proxy http://127.0.0.1:7890


git config --global --list


git push -u origin 5.2.x
git push -u origin 5.2.x:5.3.x


### tag

git tag

git switch -c <new_branch_name> <tag_name>