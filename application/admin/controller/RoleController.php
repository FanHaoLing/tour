<?php
namespace app\admin\controller;
use think\Controller;
/**
* 角色管理
*/
class RoleController extends Controller
{
    
    public function index()
    {
        return $this->fetch();
    }
}