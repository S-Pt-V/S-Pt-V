# 线性代数

吉尔伯特·斯特朗

## 方程组

假设有两个未知数的方程组

$$
\begin{cases}
    2x-y=0 \\
    -x+2y=3
\end{cases}
$$

方程式的系数矩阵为：

$$
\begin{bmatrix}
   2 & -1 \\
   -1 & 2 
\end{bmatrix}
$$

方程式的矩阵形式为：

$$
\begin{bmatrix}
    2 & -1 \\
    -1 & 2 
\end{bmatrix}
\begin{bmatrix}
    x\\
    y
\end{bmatrix} = 
\begin{bmatrix}
    0 \\
    3
\end{bmatrix}
$$

可以写为 A·X=b

### 行图像

上述方程组的行图像为：一次取一行在xy平面上作出满足该方程的图像，图像上的所有点均为该方程的解。

两条直线的交点同时满足两个方程，是方程组的解。

### 列图像

看矩阵的列，将方程组写为：

$$
x \begin{bmatrix} 2 \\ -1 \end{bmatrix} + y \begin{bmatrix} -1 \\ 2 \end{bmatrix} = \begin{bmatrix} 0 \\ 3 \end{bmatrix}
$$

x、y后的参数为矩阵的各列，方程的右侧为参数b。

该方程组的意义是：列向量的线性组合。寻找将[2 -1]T和[-1 2]T线性组合起来能够得到[0 3]T的参数x和y；即寻找这两个向量的线性组合。

其几何图像为，xy坐标系下的两个向量，[2,-1]和[-1,2]，在图上将其线性组合得到[0,3]（可以理解为向量的平行四边形法则）。
