with cte(menuId,menuName,PARENT) 
as 
(--父项 
select menuId,menuName,PARENT from Menu where PARENT = 'ROOT' 
union all 
--递归结果集中的下级 
select  t.menuId,t.menuName,t.PARENT from Menu  t
inner join cte as c on t.PARENT = c.menuId
) 
select menuId,menuName,PARENT  from cte 
