# K-近邻算法

## 概述
简单地说，k近邻算法采用测量不同特征值之间的距离方法进行分类。

**优点**：精度高，对异常值不敏感，无数据输入假定。</br>
**缺点**：计算复杂度高，空间复杂度高。</br>
**适用范围**：数值型和标称型。</br>

### 工作原理
存在一个样本数据集合，也称作训练样本集，并且样本集中每个数据都存在标签，即我们知道样本集中没意数据与所属分类的对应关系。输入没有标签的新数据后，将新数据的每个特征与样本集中数据对应的特征进行比较，然后算法提取样本集中特征最相近的数据(最近邻)的分类标签。一般来说我们只选择样本数据集中前k个最相似的数据，这就是k-近邻算法中k的出处，通常k是不大于20的整数。最后选择k个最相似数据中出现次数最多的分类，作为新数据的分类。

### 一般流程
1. 收集数据：可以使用任何方法。
2. 准备数据：距离计算所需要的数值，最好是结构化的数据格式。
3. 分析数据：可以适用任何方法。
4. 训练算法：此步骤不适用于k-近邻算法。
5. 测试算法：计算错误率。
6. 使用算法：首先需要输入样本数据和结构化的输出结果，然后运行k-近邻算法判定输入数据分别属于哪个分类，最后应用对计算出的分类执行后续的处理。

### python构造kNN分类器

```python
from numpy import *
import operater

def createDataSet():
  group = array([1.0,1],[1.0,1.0],[0,0],[0,0.1])
  labels = ['A','A','B','B']
  return group,labels

def classify0(inX, dataSet, labels, k):
  dataSetSize = dataSet.shape[0]
  # 距离计算
  diffMat = tile(inX, (dataSetSize, 1)) - dataSet
  sqDiffMat = diffMat**2
  sqDistances = sqDiffMat.sum(axis=1)
  distances = sqDistances**0.5
  sortedDistIndicies = distances.argsort()
  classCount = {}
  for i in range(k):
    voteIlabel = labels[sortedDistIndices[i]]
    # 选择距离最小的k个点
    classCount[voteIlabel] = classCount.get(voteIlabel, 0) +1
  sortedClassCount = sorted(classCount.iteritems(),key=operator.itemgetter(1), reverse=True)
  return sortedClassCount[0] [0]
```

















