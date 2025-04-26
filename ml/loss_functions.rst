===============
Loss Functions
===============

Cross Entropy Loss
------------------

Calculates a score that summarizes correctnes of set of
classifications. Value close to 0 is better, high values are worse.

The target value should be the index of the correct class. Each 
vector location should be a probability of the input belonging to
the corresponding index.

Example

::

  classification: [.0001, .988]
  target: 1

Pytorch take a batches of classification.

::

  classifications:
    [
      [.0001, .988],
      [.923, .0001],
      [.923, .0003],
    ]
  targets:
    [1, 0, 0]


Typical input is a vector of probabilities, where each element
represents the probability of the input belonging to a particular
class. The target is a vector of probabilities, where each element
is a an integer label representing the class.





See more on `Geek for Geeks - Cross Entropy`_

.. _`Geek for Geeks - Cross Entropy`: https://www.geeksforgeeks.org/what-is-cross-entropy-loss-function/